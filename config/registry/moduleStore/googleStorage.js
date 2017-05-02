/**
 * Created by smcgary on 5/1/17.
 */

module.exports = (Config, Override) => {
	return new Config({
		bucketName: Override({
			value: 'npm-registry',
			env: 'GOOGLE_STORAGE_BUCKET_NAME'
		}),
		keyFilename: Override({
			env: 'GOOGLE_STORAGE_KEY_FILENAME'
		})
	});
};