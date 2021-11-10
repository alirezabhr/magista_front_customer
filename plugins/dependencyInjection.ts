import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Context, Plugin } from '@nuxt/types'
import applyCaseMiddleware from 'axios-case-converter';
import { AxiosInstance } from 'axios'

class DependencyInjector {
    instanceMap = new Map<any,any>();

    get<T>(base: (new () => T)): T{
        return this.instanceMap.get(base) as T;
    }

    set<T>(base: (new () => T), instance: any): void{
        if(!(instance instanceof base)) {
            throw new Error("Cannot assign instance " + instance + " to " + base.name);
        }
        this.instanceMap.set(base, instance);
    }
    private constructor(){}

    private static _instance : DependencyInjector;
    public static get instance(): DependencyInjector {
        if (!DependencyInjector._instance) {
            DependencyInjector._instance = new DependencyInjector();
        }

        return DependencyInjector._instance;
    }
};

declare module 'vue/types/vue' {
    // this.$myInjectedFunction inside Vue components
    interface Vue {
        $di: DependencyInjector
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $di: DependencyInjector
    }

    // nuxtContext.$myInjectedFunction
    interface Context {
        $di: DependencyInjector
    }
}

declare module 'vuex/types/index' {
    // this.$myInjectedFunction inside Vuex stores
    interface Store<S> {
        $di: DependencyInjector
    }
}

const di = DependencyInjector.instance;

const setupAxiosClient = (context: Context) : AxiosInstance => {
    const axiosInstance = context.$axios.create()

    // set authentication header
    axiosInstance.onRequest(config => {
        const accessToken = context.store.getters['auth/getUserToken'];
        if(!!accessToken){
            config.headers.common['Authorization'] = accessToken
        }
    })

    axiosInstance.onError(async error => {
        if(!!error.response) {
            // if authentication error, try refreshing the token
            if(error.response.status == 401) {
                console.log("refreshing token");
                console.log("should refresh token");
                // try {
                //     const newAccessToken = await context.store.dispatch(StoreNamespaceEnum.AUTH + '/' + AuthActionType.REFRESH_TOKEN);
                //     return new Promise((resolve) => {
                //         error.config.headers
                //             .common['Authorization'] = `Bearer ${newAccessToken}`
                //         resolve(axiosInstance(error.config))
                //     })
                // } catch (err) {
                //     Promise.reject(err)
                // }
            }
        }
        return Promise.reject(error)
    })

    // our server is in python and accepting (and resposing) in snake case
    // so we need a middleware to converter cases
    const client = applyCaseMiddleware(axiosInstance);
    return client;
}

const dependencyInjector: Plugin = (context, inject) => {
    
    const client = setupAxiosClient(context);

    // di.set(CoinRepository, new CoinRepositoryImpl({
    //         client: client,
    //     })
    // );

    // di.set(MarketRepository, new BinanceMarketMock());

    inject('di', di);
}

export default dependencyInjector
