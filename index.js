
exports.googleCloud = (req, res) => {
	process.env.REGISTRY_REGISTRY_MODULE_STORE_TYPE = 'googleStorage';
	process.env.REGISTRY_REGISTRY_METADATA_STORE_TYPE = 'googleDatastore';

	require('./platforms/googleCloud')(req, res);
}
