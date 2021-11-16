module.exports = {
    apps: [
      {
        name: 'magista',
        exec_mode: 'cluster',
        merge_logs: true,
        instances: '10',
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ]
}