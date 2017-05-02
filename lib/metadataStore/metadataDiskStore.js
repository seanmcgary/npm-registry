/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

const MetadataStore = require('./metadataStore');

class MetadataDiskStore extends MetadataStore {
	constructor(options = {}) {
		super(options);

		const { metadataDir = path.resolve(`${__dirname}/../../metadata`) } = this.options;
		this.metadataDir = metadataDir;

		this._initializeMetadata();
	}

	static get metadataStoreType() {
		return 'disk';
	}

	_initializeMetadata() {
		return this._metadataDirectoryExists()
		.then((exists) => {
			if (!exists) {
				return this._createDirectory(this.metadataDir)
				.then(() => {
					this.metadata = {};
					this._writeMetadata();
				});
			}

			return this._loadMetadata()
			.then((metadata) => {
				this.metadata = metadata;
			});
		});
	}

	_createDirectory(dirPath) {
		return fs.mkdirAsync(dirPath);
	}

	_metadataDirectoryExists() {
		return fs.readdirAsync(this.metadataDir)
		.then(() => true)
		.catch(() => Promise.resolve(false));
	}

	_loadMetadata() {
		return fs.readFileAsync(this._getMetadataPath())
		.then((file) => file.toString())
		.then((file) => {
			let json = {};
			try {
				json = JSON.parse(file);
			} catch(err) {}
			return json;
		});
	}

	_writeMetadata() {
		const metaStr = JSON.stringify(this.metadata);
		return fs.writeFileAsync(this._getMetadataPath(), metaStr);
	}

	_getMetadataPath() {
		return `${this.metadataDir}/metadata.json`;
	}

	getModule(moduleName) {
		const module = _.get(this.metadata, moduleName);
		if (!module) {
			return Promise.reject(new Error('module not found'));
		}
		return Promise.resolve(module);
	}

	saveModule(moduleName, moduleMetadata = {}) {
		return this.getModule(moduleName)
		.catch((err) => Promise.resolve({}))
		.then((data) => {
			return _.merge({}, data, _.omit(moduleMetadata, ['_attachments']));
		})
		.then((data) => {
			this.metadata[moduleName] = data;
			return this._writeMetadata()
			.then(() => data);
		});
	}
}

module.exports = MetadataDiskStore;