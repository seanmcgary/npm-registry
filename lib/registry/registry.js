/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const Promise = require('bluebird');

const { getModuleStore } = require('../moduleStore');
const { getMetadataStore } = require('../metadataStore');

class Registry {
	constructor({ moduleStoreOptions = {}, metadataStoreOptions = {} } = {}) {
		this.moduleStore = getModuleStore(moduleStoreOptions);
		this.metadataStore = getMetadataStore(metadataStoreOptions);
	}

	publish(moduleName, moduleMetadata) {
		return Promise.all(_.reduce(moduleMetadata._attachments, (files, metadata, name) => {
			files.push(this.moduleStore.writeModule(moduleName, name, metadata.data));
			return files;
		}, []))
		.then(() => this.metadataStore.saveModule(moduleName, moduleMetadata));
	}

	getModule(moduleName) {
		return this.metadataStore.getModule(moduleName);
	}

	install(moduleNameWithVersion) {
		return this.moduleStore.readModule(moduleNameWithVersion);
	}

	getPackageInfo() {

	}
}

module.exports = Registry;