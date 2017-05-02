/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const config = require('../../config');

const MetadataDiskStore = require('./metadataDiskStore');
const GoogleDatastoreStore = require('./googleDatastoreStore');

let storeInst;
exports.getMetadataStore = (options) => {
	if (storeInst) {
		return storeInst;
	}
	const { metadataStoreType } = config.registry;
	const store = _.find([
		MetadataDiskStore,
		GoogleDatastoreStore
	], (store) => store.metadataStoreType === metadataStoreType);

	if (!store) {
		throw new Error('invalid store type');
	}

	storeInst = new store(_.merge({}, options, config.registry.metadataStore[metadataStoreType]));
	return storeInst;
};