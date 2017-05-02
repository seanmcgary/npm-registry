/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const Promise = require('bluebird');
const googleDatastore = require('@google-cloud/datastore');
const MetadataStore = require('./metadataStore');
const { md5 } = require('../hash');

class GoogleDatastoreStore extends MetadataStore {
	constructor(options = {}) {
		super(options);

		const credentials = {};
		if (options.keyFilename && options.keyFilename.length) {
			credentials.keyFilename = options.keyFilename;
		}

		this.ds = googleDatastore(credentials);
		console.log(options);

		this.namespace = options.namespace;
	}

	static get metadataStoreType() {
		return 'googleDatastore';
	}

	_getKey(key) {
		key = key || '';
		return this.ds.key({
			namespace: this.namespace,
			path: ['module', key]
		});
	}

	getModule(moduleName) {
		return this.ds.get(this._getKey(moduleName))
		.then((data) => {
			if (data.length && _.isString(data[0].metadata)) {
				return JSON.parse(data[0].metadata);
			}
			return data;
		});
	}

	saveModule(moduleName, moduleMetadata = {}) {
		return this.getModule(moduleName)
		.catch((err) => Promise.resolve({}))
		.then((data) => {
			if (!_.isPlainObject(data)) {
				data = {};
			}
			return _.merge({}, data, _.omit(moduleMetadata, ['_attachments']));
		})
		.then((data) => {
			console.log(data)
			const key = this._getKey(moduleName);
			console.log(key);
			const payload = {
				key,
				method: 'upsert',
				data: {
					metadata: JSON.stringify(data)
				}
			};

			console.log(payload);
			return this.ds.save(payload)
			.then(() => data);
		});
	}
}

module.exports = GoogleDatastoreStore;