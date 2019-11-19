const path = require('path');
const getAbsolutePath = p => path.resolve(p);

module.exports = {
	getAbsolutePath: getAbsolutePath,
	libPath: getAbsolutePath('./lib'),
	appPath: getAbsolutePath('./app'),
	tsConfigPath: getAbsolutePath('./tsconfig.json'),
	appPublicPath: getAbsolutePath('./app/public'),
	htmlTemplate: getAbsolutePath('./app/public/index.html'),
	faviconOrigin: getAbsolutePath('./app/public/favicon.ico'),
	faviconTarget: getAbsolutePath('./release/app/favicon.ico')
};
