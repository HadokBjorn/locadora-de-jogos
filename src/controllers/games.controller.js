import { db } from "../database/database.connections.js";

export async function getGames(req, res) {
	try {
		const games = (await db.query("SELECT * FROM games;")).rows;
		res.status(200).send(games);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function postGame(req, res) {
	const { name, image, stockTotal, pricePerDay } = req.body;
	try {
		const sameName = (await db.query("SELECT * FROM games WHERE name=$1;", [name])).rows.length;
		if (sameName !== 0) return res.sendStatus(409);

		await db.query(
			`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1,$2,$3,$4);`,
			[name, image, stockTotal, pricePerDay]
		);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
