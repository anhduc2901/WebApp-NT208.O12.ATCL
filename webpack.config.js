const path=require('path')

module.exports={
    mode:"development",
    // The entry point file described above
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"bundle.js"
    },
    watch:true
}