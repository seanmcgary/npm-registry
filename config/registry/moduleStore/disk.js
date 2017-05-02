/**
 * Created by smcgary on 5/1/17.
 */
module.exports = (Config, Override) => {
	return new Config({
		moduleBaseUrl: Override({
			value: 'http://localhost',
			env: 'MODULE_STORE_MODULE_BASE_URL'
		})
	});
};