import { db } from "../database/database.connections.js";

export async function getClients(req, res) {
	try {
		const clients = (await db.query(`SELECT * FROM clientes`)).rows;
		res.status(200).send(clients);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getClientId(req, res) {
	const { id } = req.params;
	try {
		const client = (await db.query(`SELECT * FROM clientes WHERE id=$1`, [id])).rows[0];
		res.status(200).send(client);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
