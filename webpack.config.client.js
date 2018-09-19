// const path = require('path')
// const webpack = require('webpack')
// const CURRENT_WORKING_DIR = process.cwd()

// const config = {
//     name: "browser",
//     mode: "development",
//     devtool: 'eval-source-map',
//     entry: [
//         'react-hot-loader/patch',
//         'webpack-hot-middleware/client?reload=true',
//         path.join(CURRENT_WORKING_DIR, 'client/main.js')
//     ],
//     output: {
//         path: path.join(CURRENT_WORKING_DIR , '/dist'),
//         filename: 'bundle.js',
//         publicPath: '/dist/'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 exclude: /node_modules/,
//                 use: {
//                  loader: "js-to-less-loader" 
//                     }
//             },
//             {
//                 test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
//                 use: 'file-loader'
//             },
            
//             {
//                 test: /\.less$/,
//                 use: [{
//                     loader: "style-loader" // creates style nodes from JS strings
//                 }, {
//                     loader: "css-loader" // translates CSS into CommonJS
//                 }, {
//                     loader: "less-loader" // compiles Less to CSS
//                 }]
//             }
//         ]
//     },  plugins: [
//           new webpack.HotModuleReplacementPlugin(),
//           new webpack.NoEmitOnErrorsPlugin(),
//       ]
// }

// module.exports = config

const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    mode: "development",
    devtool: 'eval-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },  plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin()
      ]
}

module.exports = config
