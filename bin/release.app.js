'use strict';

const webpack = require('webpack');
const appConfig = require('../scripts/webpack/webpack.app');
const { moveSync } = require('fs-extra');
const { faviconOrigin, faviconTarget } = require('../scripts/utils/helper');

const {
	reportResultIfSuccess,
	reportErrors,
	reportWarnings,
	reportInvalidResult
} = require('../scripts/utils/reportResults');

const appBuildTarget = {
	entry: './app/index.tsx',
	output: './release/app/',
	cssName: 'app.css',
	libraryTarget: 'umd'
};

const appTargetName = './static/js/doc_site.js';

const startBuild = function() {
	const webpackConfig = appConfig(appTargetName, appBuildTarget);
	const compiler = webpack(webpackConfig);

	compiler.run(err => {
		if (err) throw err;
	});

	compiler.hooks.invalid.tap('invalid', reportInvalidResult);

	compiler.hooks.done.tap('done', stats => {
		const statsJson = stats.toJson();
		moveSync(faviconOrigin, faviconTarget);
		console.log();
		console.log('[ ======================================================== ]');

		reportResultIfSuccess(statsJson);
		reportWarnings(statsJson);
		if (reportErrors(statsJson)) process.exit();
	});
};
startBuild();
