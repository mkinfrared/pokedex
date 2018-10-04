const users = require('../models/users');

let id = 1;

module.exports = {
	login          : (req, res, next) => {
		const {session}  = req;
		const {username} = req.body;

		const user = users.find((user) => user.username === username);

		if (user) {
			session.user = user;
			res.status(200).send(session.user);
		} else {
			res.status(403).send('Unauthorised');
		}
	},
	register       : (req, res, next) => {
		const {session}  = req;
		const {username} = req.body;

		const user = users.find((user) => user.username === username);

		if (user) {
			res.status(403).send('Username taken');
		} else {
			users.push({id, username, favorites: []});
			id++;

			session.user.username = username;

			res.status(200).send(session.user);
		}
	},
	signout        : (req, res, next) => {
		const {session} = req;
		session.destroy();
		res.status(200).send(session);
	},
	getUser        : (req, res, next) => {
		const {session} = req;
		res.status(200).send(session.user);
	},
	addFavorite    : (req, res, next) => {
		const {session}           = req;
		const {username, pokemon} = req.body;

		const user = users.find((user) => user.username === username);

		user.favorites.push(pokemon);

		session.user = user;

		res.status(200).send(session.user);
	},
	removeFavorites: (req, res, next) => {
		const {session}           = req;
		const {username, pokemon} = req.body;

		const user = users.find((user) => user.username === username);

		user.favorites = user.favorites.filter((pok) => pok.name !== pokemon.name);

		session.user = user;

		res.status(200).send(session.user);
	}
};