import { db } from "../database/database.connections.js";

export async function getClients(req, res) {
	try {
		const clients = (await db.query(`SELECT * FROM clientes`)).rows;
		res.status(200).send(clients);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
