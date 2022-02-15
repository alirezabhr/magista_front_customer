import { GetterTree, MutationTree, ActionTree } from "vuex"
import { RootState } from '../index'
import Product from "~/models/product"
import CartItem from "~/models/cart_item"
import ShopCartOrder from "~/models/shop_cart_order"
import Issue from "~/models/issue_tracker/issue"

const namespace = 'cart'

interface CartState {
  cart: ShopCartOrder[]
  lastAppendedProduct: Product | null
}

const state = () : CartState => ({
  cart: [],
  lastAppendedProduct: null
})

const mutations = <MutationTree<CartState>>{
  initialCartStore (state) {
    if (!process.client) { // localStorage is only available on client side
      return
    }
    // initial cart
    const strCart = localStorage.getItem('cart')
    if (strCart) {
      state.cart = JSON.parse(strCart)
    }
  },
  setLocalStorageOrderList (state) {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  appendItemToOrderList (state, product: Product) {
    state.lastAppendedProduct = product

    const shopCartOrderIndex = state.cart.findIndex((el: ShopCartOrder) => el.shopId === product.shop.id)
    if (shopCartOrderIndex === -1) {  // don't have any products from this shop
      const shopCartOrder = new ShopCartOrder(product.shop.id, product.shop)
      shopCartOrder.addItem(new CartItem(product))
      state.cart.push(shopCartOrder)
    } else {  // have some products from this shop
      const orderItemIndex = state.cart[shopCartOrderIndex].orderItems.findIndex(
        (orderItem: CartItem) => orderItem.product.id === product.id)

      if (orderItemIndex === -1) {  // this product does not exist in the cart
        const orderItem = new CartItem(product)
        state.cart[shopCartOrderIndex].orderItems.push(orderItem)
      } else {  // you had ordered this product before
        state.cart[shopCartOrderIndex].orderItems[orderItemIndex].count += 1
      }
    }
  },
  removeItemFromOrderList (state, product: Product) {
    const shopCartOrderIndex = state.cart.findIndex((el: ShopCartOrder) => el.shopId === product.shop.id)
    if (shopCartOrderIndex === -1) {  // don't have any products from this shop
      console.log('ERROR Occured in removing item from cart') // TODO throw an erro
    } else {  // have some products from this shop
      const orderItemIndex = state.cart[shopCartOrderIndex].orderItems.findIndex(
        (orderItem: CartItem) => orderItem.product.id === product.id)

      if (orderItemIndex === -1) {  // this product does not exist in the cart
        console.log('ERROR Occured in removing item from cart') // TODO throw an erro
      } else {  // you had ordered this product before
        if (state.cart[shopCartOrderIndex].orderItems[orderItemIndex].count > 1) {
          state.cart[shopCartOrderIndex].orderItems[orderItemIndex].count -= 1
        } else {
          state.cart[shopCartOrderIndex].orderItems.splice(orderItemIndex, 1)
          if (state.cart[shopCartOrderIndex].orderItems.length === 0) { // there is no order items from this shop
            state.cart.splice(shopCartOrderIndex, 1)  // remove the shop from cart
          }
        }
      }
    }
  },
  changeShopCartOrderDelivery (state, payload) {
    const shopId = payload.shopId
    const deliveryId = payload.deliveryId
    const shopCartOrderIndex = state.cart.findIndex((el: ShopCartOrder) => el.shopId === shopId)
    if (shopCartOrderIndex === -1) {
      throw new Error('shop not found')
    } else {
      const shopCartOrder = state.cart[shopCartOrderIndex]
      shopCartOrder.deliveryId = deliveryId
      state.cart.splice(shopCartOrderIndex, 1, shopCartOrder)
    }
  },
  clearCart (state) {
    state.cart = []
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }
}

const actions = <ActionTree<CartState, RootState>>{
  addItemToCart (vuexContext, product) {
    vuexContext.commit('appendItemToOrderList', product)
    vuexContext.commit('setLocalStorageOrderList')
  },
  removeItemFromCart (vuexContext, product) {
    vuexContext.commit('removeItemFromOrderList', product)
    vuexContext.commit('setLocalStorageOrderList')
  },
  createCartOrders (vuexContext) {
    const customerId = vuexContext.rootGetters['auth/getCustomerId']
    const url = process.env.baseURL + 'order/cart/'

    let payload: {
      customer_id: number
      cart: ShopCartOrder[]
    }
    payload = {
      customer_id: customerId,
      cart: vuexContext.getters.getCart
    }

    return this.$client.post(url, payload).then((response) => {
      vuexContext.commit('invoice/setSelectedInvoice', response.data, { root: true })
      vuexContext.commit('clearCart')
      return response.data.id
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('createCartOrders',  JSON.stringify(e.response))
      issue.setCritical()
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  }
}

const getters = <GetterTree<CartState, RootState>>{
  getLastAppendedProduct: (state) => {
    return state.lastAppendedProduct
  },
  getCartItemCounts: (state) => {
    let count = 0
    state.cart.forEach((shopCartOrder: ShopCartOrder) => {
      shopCartOrder.orderItems.forEach((orderItem: CartItem) => {
        count += orderItem.count
      })
    })
    return count
  },
  getCartTotalPrice: (state) => {
    let total = 0
    state.cart.forEach((shopCartOrder: ShopCartOrder) => {
      shopCartOrder.orderItems.forEach((orderItem: CartItem) => {
        total = total + orderItem.count * orderItem.product.finalPrice
      })
    })
    return total
  },
  getCart: (state) : ShopCartOrder[] => {
    return state.cart
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
