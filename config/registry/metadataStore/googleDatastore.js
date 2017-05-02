/**
 * Created by smcgary on 5/1/17.
 */
module.exports = (Config, Override) => {
	return new Config({
		keyFilename: Override({
			env: 'GOOGLE_DATASTORE_KEY_FILENAME'
		}),
		namespace: Override({
			value: 'npmRegistry',
			env: 'GOOGLE_DATASTORE_NAMESPACE'
		}),
		project: Override({
			env: 'GOOGLE_DATASTORE_PROJECT'
		})
	});
};