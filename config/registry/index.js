/**
 * Created by smcgary on 5/1/17.
 */

const _ = require('lodash');
const CC = require('config-composer');

const Composer = new CC.Composer({
	configPath: __dirname,
	envPrefix: 'REGISTRY_REGISTRY_'
});

Composer.loadConfig('moduleStore');
Composer.loadConfig('metadataStore');

module.exports = (Config, Override) => {
	return new Config(_.merge(Composer.getConfig(), {
		moduleStoreType: Override({
			value: 'disk',
			env: 'REGISTRY_MODULE_STORE_TYPE'
		}),
		metadataStoreType: Override({
			value: 'disk',
			env: 'REGISTRY_METADATA_STORE_TYPE'
		})
	}));
};
