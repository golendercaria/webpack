// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log("production : ",isProduction)

const config = {
    entry: './src/index.js',
    output: {
		filename: isProduction ? './js/build/[name].min.js' : './js/build/[name].js',
		path: path.resolve(__dirname),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
	plugins: [
		
		new MiniCssExtractPlugin({
			filename: isProduction ? './css/build/[name].min.css' : './css/build/src/[name].css'
		}),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
				test: /\.s[ac]ss$/i,
				include: [
					path.resolve(__dirname)
				],
				use: [
					/*isProduction ? MiniCssExtractPlugin.loader : {
						loader: stylesHandler
					},*/
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
	}
	
	/*//if Wordpress load jQuery
	externals: {
		jquery: 'jQuery'
	}*/
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};