/**
 * Created by smcgary on 5/1/17.
 */

const Registry = require('../../registry');

function getModule() {

}

function publishModule(req, res) {
	return res.json({
		url: req.url
	});
}

function installModule() {

}

module.exports = (req, res) => {

	console.log(req.method);
	console.log(req.url);
	const method = req.method.toUpperCase();

	if (method === 'PUT') {
		return publishModule(req, res);
	}
};