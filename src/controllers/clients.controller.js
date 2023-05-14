import { db } from "../database/database.connections.js";

export async function createClient(req, res) {
	const { name, phone, cpf, birthday } = req.body;
	try {
		/* const sameCpf = (await db.query(`SELECT * FROM clientes WHERE cpf=$1`, [cpf])).rows.length;
		if (sameCpf !== 0) return res.sendStatus(409); */

		await db.query(`INSERT INTO clientes (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)`, [
			name,
			phone,
			cpf,
			birthday,
		]);
		res.sendStatus(201);
	} catch (err) {
		if (err.code === "23505") return res.status(409).send(err.message);
		res.status(500).send(err);
	}
}

export async function getClients(req, res) {
	try {
		const clients = (
			await db.query(`SELECT
			id,
			name,
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

export async function getClient(req, res) {
	const { id } = req.params;
	try {
		const client = await db.query(`SELECT * FROM clientes WHERE id=$1`, [id]);
		if (client.rowCount === 0) return res.sendStatus(404);
		res.status(200).send(client.rows[0]);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function updateClient(req, res) {
	const { id } = req.params;
	const { name, phone, cpf, birthday } = req.body;

	try {
		const teste = await db.query(
			`UPDATE clientes SET name=$2, phone=$3, birthday=$5 WHERE id=$1 AND cpf=$4;`,
			[id, name, phone, cpf, birthday]
		);
		if (teste.rowCount === 0) return res.sendStatus(409);
		res.sendStatus(200);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
