/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const config = require('../../config');

const ModuleDiskStore = require('./moduleDiskStore');
const GoogleStorageStore = require('./googleStorageStore');

let storeInst;
exports.getModuleStore = (options) => {
	if (storeInst) {
		return storeInst;
	}
	const { moduleStoreType } = config.registry;
	const store = _.find([
		ModuleDiskStore,
		GoogleStorageStore
	], (store) => store.storageType === moduleStoreType);

	if (!store) {
		throw new Error('invalid store type');
	}

	storeInst = new store(_.merge({}, options, config.registry.moduleStore[moduleStoreType]));
	return storeInst;
};