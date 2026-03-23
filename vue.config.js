const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  // Evitar que el build falle por ESLint (scripts en assets/js y legacy)
  lintOnSave: false,

  // 🔧 COMPRESSION: Habilitar compresión Gzip/Brotli en producción
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // Comprimir archivos para reducir tamaño
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 8192, // Solo comprimir archivos > 8KB
          minRatio: 0.8,
          deleteOriginalAssets: false // Mantener archivos originales
        })
      )
    }
  },
  
  // Añade estas configuraciones adicionales
  devServer: {
    host: '0.0.0.0',    // Permite conexiones desde cualquier IP
    port: 8080,         // Puerto específico
    hot: true,          // Habilita Hot Module Replacement
    liveReload: true,    // Habilita Live Reload
    watchFiles: ['src/**/*', 'public/**/*'], // Archivos a observar
    client: {
      overlay: {
        warnings: false, // Oculta warnings en el navegador
        errors: true     // Muestra solo errores
      },
      progress: true     // Muestra progreso de compilación
    },
    allowedHosts: 'all',  // Permite todos los hosts
    // Headers para prevenir caché en móvil
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },
  
  chainWebpack: config => {
    // Título del sitio (para pestaña del navegador y aprobación Cryptomus)
    config.plugin('html').tap(args => {
      args[0].title = 'Dominues – Dominó Online';
      return args;
    });
    // Configuración para mejor detección de cambios
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.hotReload = true
        return options
      })
    
    // Asegurar que los archivos tengan hash para cache busting en producción
    // Vue CLI ya hace esto por defecto, pero lo explicitamos
    if (process.env.NODE_ENV === 'production') {
      config.output
        .filename('js/[name].[contenthash:8].js')
        .chunkFilename('js/[name].[contenthash:8].js')
    }
  }
})