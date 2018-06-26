
const path = require("path");
const myPath=path.join(__dirname,"public");
console.log (myPath);
module.exports = {
   entry:"./react_src/main.js",
     output:{
       path:path.join(myPath,"scripts"),
       filename:'bundle.js'
   },
   mode:"development",
   module:{
       rules:[
           {
               loader:"babel-loader",
               test: /\.js$/,
               exclude:/node_modules/
           }
       ]
   },
   devtool:"cheap-module-eval-source-map",

}
