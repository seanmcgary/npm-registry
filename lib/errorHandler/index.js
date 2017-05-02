/**
 * Created by smcgary on 5/1/17.
 */
const _ = require('lodash');

module.exports = function(){

	return (req, res, next) => {
		res.handleError = (error) => {
			const statusCode = _.get(error, 'type.statusCode') || 400;
			return res.json(statusCode, {});
		};

		next();
	};
};