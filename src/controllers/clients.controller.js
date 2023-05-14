import { db } from "../database/database.connections.js";

export async function createClient(req, res) {
	const { name, phone, cpf, birthday } = req.body;
	console.log(birthday);
	try {
		const sameCpf = (await db.query(`SELECT * FROM clientes WHERE cpf=$1`, [cpf])).rows.length;

		if (sameCpf !== 0) return res.sendStatus(409);

		await db.query(`INSERT INTO clientes (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)`, [
			name,
			phone,
			cpf,
			birthday,
		]);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getClients(req, res) {
	try {
		const clients = (
			await db.query(`SELECT name,
        phone,
        cpf,
        TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday
        FROM clientes;`)
		).rows;

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
