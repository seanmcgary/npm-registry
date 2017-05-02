/**
 * Created by smcgary on 5/1/17.
 */

module.exports = (Config, Override) => {
	return new Config({
		port: Override({
			value: 6000,
			env: 'WEBSERVER_PORT'
		}),
		bodyParser: [
			{ name: 'json' },
			{ name: 'urlencoded', options: { extended: true }}
		]
	});
};
