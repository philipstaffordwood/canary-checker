module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            '^/api': {
                target: 'http://localhost:8080/',
                changeOrigin: true,
                logLevel: 'debug'
            },
        }
    },
    configureWebpack: {
        //nicer debugging in browser dev tools
        devtool: 'source-map'
    }
}