/**
 * Created by smcgary on 5/1/17.
 */


class MetadataStore {
	constructor(options) {
		this.options = options || {};
	}

	/**
	 * e.g. @seanmcgary/faux-app
	 * @param moduleName
	 */
	getModule(moduleName) {
		throw new Error('implementation required');
	}

	saveModule(moduleName, moduleMetadata = {}) {
		throw new Error('implementation required');
	}
}

module.exports = MetadataStore;