const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

// settings our own plugin
class RunAfterCompile {
	apply(compiler) {
		compiler.hooks.done.tap("Copy images", function () {
			fse.copySync("./app/assets/images", "./dist/assets/images");
		});
	}
}

let cssConfig = {
	test: /\.s[ac]ss$/i,
	use: ["css-loader?url=false", "sass-loader"],
};

let pages = fse
	.readdirSync("./app")
	.filter(function (file) {
		return file.endsWith(".html");
	})
	.map(function (page) {
		return new HtmlWebpackPlugin({
			filename: page,
			template: `./app/${page}`,
		});
	});

let config = {
	entry: "./app/assets/images/Scripts/App.js",
	plugins: pages,
	module: {
		rules: [cssConfig],
	},
};

if (currentTask === "dev") {
	cssConfig.use.unshift("style-loader");
	config.output = {
		filename: "bundled.js",
		path: path.resolve(__dirname, "app"),
	};

	config.devServer = {
		before: function (app, server) {
			server._watch("./app/**/*.html");
		},
		contentBase: path.join(__dirname, "app"),
		hot: true,
		port: 3000,
		host: "0.0.0.0",
	};
	config.mode = "development";
}

if (currentTask === "build") {
	config.module.rules.push({
		test: /\.js$/,
		exclude: /(node_modules)/,
		use: {
			loader: "babel-loader",
			options: {
				presets: ["@babel/preset-env"],
			},
		},
	});

	cssConfig.use.unshift(MiniCssExtractPlugin.loader);
	config.output = {
		filename: "[name].[chunkhash].js",
		chunkFilename: "[name].[chunkhash].js",
		path: path.resolve(__dirname, "dist"),
	};

	config.mode = "production";
	config.optimization = {
		splitChunks: { chunks: "all" },
	};

	config.plugins.push(
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }),
		new RunAfterCompile()
	);
}

module.exports = config;
