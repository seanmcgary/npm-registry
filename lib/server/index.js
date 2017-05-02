/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');
const express = require('express');
const webserver = require('webserver-base');
const path = require('path');
const config = require('../../config');
const errorHandler = require('../errorHandler');

const app = webserver(config.webserver);

app.use(errorHandler());

function loadRoutes(route) {
	route = route || '';
	const BASE_ROUTE_PATH = `${__dirname}/../routes`;
	let routePath = BASE_ROUTE_PATH;

	if (route && route.length) {
		routePath = `${routePath}/${route}`;
	}
	try {
		require(path.resolve(routePath))(app, app.server);
	} catch(err) {
		console.log(err);
	}
}

loadRoutes('registry');

app.listen(6000, () => {
	console.log('listening on port 6000');
});