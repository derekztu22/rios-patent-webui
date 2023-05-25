module.exports = {
  transpileDependencies: true,
  devServer: {
    port: 23456,
    allowedHosts: [
      'rioslab.org', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.rioslab.org'   // .是二级域名的通配符   
    ],
    // proxy: {
    //   '/runTask': {
    //      target: "http://localhost:23457/runTask", // 目标路径
    //      changeOrigin: true, // 是否跨域
    //      timeout: 20*60*1000, //设置超时
    //    }
    //  }
  }
}