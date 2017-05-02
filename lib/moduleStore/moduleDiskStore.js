/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));
const config = require('../../config');

const ModuleStore = require('./moduleStore');

class ModuleDiskStore extends ModuleStore {
	constructor(options){
		super(options);

		const { dir = path.resolve(`${__dirname}/../../registry`) } = options;

		this.moduleDir = dir;
		this._initializeBaseDirectory();
	}

	static get storageType() {
		return 'disk';
	}

	_initializeBaseDirectory() {
		return this._registryBaseDirectoryExists()
		.then((exists) => {
			if (!exists) {
				return this._createDirectory(this.moduleDir);
			}
		});
	}

	_createDirectory(dirPath) {
		return fs.mkdirAsync(dirPath);
	}

	_createDirectoryIfNotExists(dirPath) {
		return fs.readdirAsync(dirPath)
		.catch(() => this._createDirectory(dirPath));
	}

	_registryBaseDirectoryExists() {
		return fs.readdirAsync(this.moduleDir)
		.then(() => true)
		.catch(() => Promise.resolve(false));
	}

	_getModulePath(moduleName) {
		return `${this.moduleDir}/${moduleName}`;
	}

	_writeModuleToDisk(moduleName, moduleData) {
		const file = this._getModulePath(moduleName);
		return fs.readFileAsync(file)
		.catch(() => {
			return fs.writeFileAsync(file, Buffer.from(moduleData, 'base64'))
			.then(() => null);
		})
		.then((data) => {
			if (data === null) {
				return;
			}

			throw new Error('file already exists');
		});
	}

	writeModule(moduleName, moduleNameWithVersion, moduleData) {
		let subDirPromise;
		if (moduleNameWithVersion.indexOf('/') >= 0) {
			const moduleSubdir = moduleNameWithVersion.split('/').slice(0, -1).join('/');
			subDirPromise = this._createDirectoryIfNotExists(this._getModulePath(moduleSubdir));
		} else {
			subDirPromise = Promise.resolve();
		}

		return subDirPromise
		.then(() => {
			return this._writeModuleToDisk(moduleNameWithVersion, moduleData);
		});
	}

	readModule(moduleNameWithVersion) {
		const filePath = this._getModulePath(moduleNameWithVersion);
		return Promise.resolve(fs.createReadStream(filePath));
	}
}

module.exports = ModuleDiskStore;
