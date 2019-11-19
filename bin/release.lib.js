/* eslint-disable no-undef */
'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const { exec } = require('child_process');
const { emptyDir } = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const args = process.argv.slice(2)[0];
const isLib = args === 'lib';

const compileJs = () =>
	new Promise((resolve, reject) => {
		const useWhichCompiler = isLib ? 'lib:babel' : 'es:tsc';
		console.log(`${useWhichCompiler} start compile.....`);
		exec(`npm run ${useWhichCompiler}`, (err, stdout) => {
			if (err) reject(err);
			resolve(stdout);
		});
	});

const generateDts = () =>
	new Promise((resolve, reject) => {
		console.log('start generate d.ts.....');
		exec(`npm run ${isLib ? 'lib:dts' : 'es:dts'}`, err => {
			if (err) reject(err);
			resolve('d.ts generates successfully');
		});
	});

const compileScss = () =>
	new Promise(resolve => {
		const which = isLib ? 'scss:lib' : 'scss:es';
		console.log('start compile scss' + ' .....');
		exec(`npm run ${which}`, (err, stdout, stderr) => {
			resolve(err ? stderr : 'Scss has been compiled successfully');
		});
	});

emptyDir(path.resolve(`./release/${args}`))
	.then(() => compileJs())
	.then(std => {
		console.log(chalk.cyan(std));
		return compileScss();
	})
	.then(std => {
		console.log(chalk.green(std));
		console.log();
		return generateDts();
	})
	.then(std => {
		console.log(chalk.magenta(std));
		console.log();
	})
	.catch(err => {
		console.log(chalk.red(err));
	});
