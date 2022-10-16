const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js',
	},
	resolve: {
		alias: {
			Components: path.resolve(__dirname, 'src/components/'),
			Entities: path.resolve(__dirname, 'src/entities/'),
			Scenes: path.resolve(__dirname, 'src/scenes/'),
			Scripts: path.resolve(__dirname, 'src/scripts/'),
			Styles: path.resolve(__dirname, 'src/styles/'),
		},
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './public',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Game Server',
			meta: {
				language: {
					httpEquiv: 'Content-Language',
					content: 'en_US'
				},
				viewport: { 
					key: 'viewport',
					content: 'initial-scale=1, width=device-width'
				}
			},
			templateContent: ({htmlWebpackPlugin}) => `
				<html>
				<head>
					${htmlWebpackPlugin.tags.headTags}
				</head>
				<body>
					<div id="root"></div>
					${htmlWebpackPlugin.tags.bodyTags}
				</body>
				</html>
			`
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	optimization: {
		runtimeChunk: 'single',
	},
	module: {
		rules: [
			{
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                        ]
                    }
                }
            },
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
};