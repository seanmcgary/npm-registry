/**
 * Created by smcgary on 5/1/17.
 */

module.exports = (req, res) => {
	console.log(req.method);
	console.log(req.url);

	res.json({ test: 'foo' });
};