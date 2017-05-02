/**
 * Created by smcgary on 5/1/17.
 */
const crypto = require('crypto');

exports.md5 = (str = '') => {
	str = str || '';

	return crypto.createHash('md5').update(str).digest('hex');
};