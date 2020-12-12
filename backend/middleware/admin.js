const jwt = require("jsonwebtoken");
const { secret } = require('../config.json');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization; //Récupération du token du header
		const decodedToken = jwt.verify(token, secret); //Décodage du token
        const admin = decodedToken.admin;
        const userId = decodedToken.userId;
		if (admin !== true && userId !== req.headers.objectid) {
			throw "Action non autorisée";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!"),
		})
		;
	}
};