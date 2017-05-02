/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const Registry = require('../registry');
const proxy = require('http-proxy');

const proxyServer = proxy.createProxyServer({
	target: 'http://registry.npmjs.org',
	hostRewrite: true,
	changeOrigin: true
});

module.exports = (app, server) => {

	server.get('/api/metadata', server.pr((req, res) => {
		res.json(Registry.metadataStore.metadata);
	}));

	server.get(/(.*)\/(-)\/(.*).[tar\.gz|tgz]/i, (req, res, next) => {
		const tarballName = _.last(req.url.split('/-/'));
		return Registry.install(tarballName)
		.then((stream) => stream.pipe(res));
	});

	server.put('/:packageName', server.pr((req, res) => {
		console.log('publish');
		const packageName = decodeURIComponent(req.params.packageName);
		return Registry.publish(packageName, req.body)
		.catch((err) => {
			console.log(err);
			throw err;
		})
	}));

	server.get('/:packageName', (req, res, next) => {
		const packageName = decodeURIComponent(req.params.packageName);
		return Registry.getModule(packageName)
		.then((data) => res.json(data))
		.catch((err) => {
			console.log(`proxying to registry.npmjs.org for ${packageName}`);
			proxyServer.web(req, res, { target: 'http://registry.npmjs.org' }, (err) => {
				console.log('proxy error: ', err);
			});
		});
	});
};