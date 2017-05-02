/**
 * Created by smcgary on 5/1/17.
 */

const Registry = require('./registry');

let registryInst;
module.exports = (() => {
	if (!registryInst) {
		registryInst = new Registry();
	}

	return registryInst;
})();