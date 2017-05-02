/**
 * Created by smcgary on 5/1/17.
 */
const gcloudStorage = require('@google-cloud/storage');
const ModuleStore = require('./moduleStore');

class GoogleStorageStore extends ModuleStore {
	constructor(options = {}){
		super(options);

		this.gs = gcloudStorage({
			bucketName: options.bucketName,
			keyFilename: options.keyFilename
		});
	}

	static get storageType() {
		return 'googleStorage';
	}

	get bucket() {
		return this.gs.bucket(this.options.bucketName);
	}

	getFile(fileName) {
		return this.bucket.file(fileName);
	}


	writeModule(moduleName, moduleNameWithVersion, moduleData) {
		const file = this.getFile(moduleNameWithVersion);

		return file.exists()
		.then((data) => data[0])
		.then((exists) => {
			if (exists) {
				throw new Error('file already exists');
			}

			return file.save(Buffer.from(moduleData, 'base64'));
		});
	}

	readModule(moduleNameWithVersion) {
		const file = this.getFile(moduleNameWithVersion);

		return file.exists()
		.then((data) => data[0])
		.then((exists) => {
			if (exists) {
				throw new Error('file not found');
			}

			return file.createReadStream();
		});
	}
}
module.exports = GoogleStorageStore;