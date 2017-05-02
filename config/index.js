/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const CC = require('config-composer');

const Composer = new CC.Composer({
	configPath: __dirname,
	envPrefix: 'REGISTRY_'
});

Composer.loadConfig('registry');
Composer.loadConfig('webserver');


const config = _.merge({}, Composer.getConfig(), {});

if (process.env.SHOW_CONFIG === 'true') {
	const util = require('util');
	console.log(util.inspect(config, true, 5, true));
}

module.exports = config;