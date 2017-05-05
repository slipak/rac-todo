var path = require('path');

module.exports = {
	entry: path.resolve(__dirname + '/src'),
	output: {
		path: path.resolve(__dirname + '/dist'),
		filename: 'bundle.js',
		publicPath: '/assets/'
	},

	module: {
		rules: [
			{test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/},
			{test: /\.s?css$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: ['./src/scss/mixins.scss']
						}
					}
				]
			},
	      	{test: /\.woff/, loader : require.resolve("url-loader") + '?prefix=font/&limit=10000&mimetype=application/font-woff&name=assets/[hash].[ext]'},
	      	{test: /\.ttf/, loader : require.resolve("file-loader") + '?prefix=font/&name=assets/[hash].[ext]'},
	      	{test: /\.eot/, loader : require.resolve("file-loader") + '?prefix=font/&name=assets/[hash].[ext]'},
	      	{test: /\.svg/, loader : require.resolve("file-loader") + '?prefix=font/&name=assets/[hash].[ext]'}
		]
	},
	devtool: 'source-map',
	devServer: {
		port: 3310,
		contentBase: path.resolve(__dirname + "/src")
	}
};