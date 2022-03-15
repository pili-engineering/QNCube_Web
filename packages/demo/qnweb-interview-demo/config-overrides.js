const { override, fixBabelImports, addWebpackPlugin, overrideDevServer, addWebpackAlias } = require('customize-cra');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require('path');
const paths = require('react-scripts/config/paths');

console.log('当前环境: ', process.env.REACT_APP_ENV);

const devServerConfig = config => ({
	...config,
	host: '10.135.47.203',
	// host: '0.0.0.0',
	// allowedHosts: [
	// 	'.local',
	// ],
});

const addCustomize = () => config => {
  config.devtool = false;
  config.output.path = path.resolve(__dirname, 'dist');
  return config;
}

module.exports = {
  paths: function () {
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
    return paths;
  },
	webpack: override(
		fixBabelImports('import', {
			libraryName: 'antd',
			style: 'css'
		}),
		addWebpackPlugin(
			new TypedCssModulesPlugin({
				globPattern: 'src/**/*.css'
			}),
			new AntdDayjsWebpackPlugin()
		),
		addWebpackAlias({
			'@': path.resolve(__dirname, 'src')
		}),
    addCustomize()
	),
	devServer: overrideDevServer(
		devServerConfig
	)
};
