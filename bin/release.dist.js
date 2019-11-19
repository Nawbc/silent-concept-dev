/* eslint-disable no-console */
'use strict';

const webpack = require('webpack');
const setConfig = require('../scripts/webpack/webpack.lib');
const buildTarget = require('./buildTargets.json');
const isZip = process.env.IS_ZIP === 'true';
const path = require('path');
const {
	reportResultIfSuccess,
	reportErrors,
	reportWarnings,
	reportInvalidResult
} = require('../scripts/utils/reportResults');

const handleDevName = n => {
	const { name, ext } = path.parse(n);
	return name + '.dev' + ext;
};

const startBuild = async function() {
	for await (const [name, config] of Object.entries(buildTarget)) {
		const cssName = config['cssName'];
		const handledJsName = isZip ? handleDevName(name) : name;
		const handledCssName = isZip ? handleDevName(cssName) : cssName;
		config['cssName'] = handledCssName;
		const webpackConfig = setConfig(handledJsName, config);

		const compiler = webpack(webpackConfig);

		compiler.run(err => {
			if (err) throw err;
		});

		compiler.hooks.invalid.tap('invalid', reportInvalidResult);

		compiler.hooks.done.tap('done', stats => {
			const statsJson = stats.toJson();

			console.log();
			console.log('[ ======================================================== ]');

			reportResultIfSuccess(statsJson);
			if (reportErrors(statsJson)) {
				process.exit();
			}
			reportWarnings(statsJson);
		});
	}
};
startBuild();
