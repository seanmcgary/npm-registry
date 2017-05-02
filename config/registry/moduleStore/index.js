/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const CC = require('config-composer');

const Composer = new CC.Composer({
	configPath: __dirname,
	envPrefix: 'REGISTRY_REGISTRY_MODULE_STORE_'
});

Composer.loadConfig('disk');
Composer.loadConfig('googleStorage');

module.exports = (Config, Override) => {
	return new Config(Composer.getConfig());
};