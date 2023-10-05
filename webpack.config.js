const path=require('path')

module.exports={
    mode:"development",
    // The entry point file described above
    entry:
        "./src/firebase.js"
    ,
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"bundle.js"
    },
    // webpack.config.js

    resolve: {
        fallback: {
        constants: require.resolve("constants-browserify"),
        stream: require.resolve("constants-browserify"),
        "crypto": false,
        "os": require.resolve("os-browserify/browser"),
        "path": require.resolve("path-browserify")


        },
    },
  
    watch:true
}