/**
 * Created by smcgary on 5/1/17.
 */


class ModuleStore {
	constructor(options = {}) {
		this.options = options || {};
	}

	writeModule(moduleName, moduleNameWithVersion, moduleData) {
		throw new Error('implementation required');
	}

	readModule(moduleNameWithVersion) {
		throw new Error('implementation required');
	}
}

module.exports = ModuleStore;