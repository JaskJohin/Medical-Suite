/* -----Webpack configuration file for the Medical Suite project----- */

//Import the Node.JS path module
const path = require('path');

//Export the configuration object for Webpack
module.exports = 
{
    mode: 'development',
    entry: './src/index.js',
    output:
    {
        /*Resolve the path to the dist folder (output folder for the bundle.js file) 
        Have to use the path module to resolve the path*/
        path: path.resolve(__dirname, 'dist'),
        //Name of the output file
        filename: 'bundle.js'
    },
    //Watch for changes in the source files
    watch: true
}