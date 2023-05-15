import dayjs from "dayjs";
import { db } from "../database/database.connections.js";

export async function createRental(req, res) {
	const { customerId, gameId, daysRented } = req.body;

	try {
		const gamePrice = await db.query(
			`SELECT games."pricePerDay", games."stockTotal",
            (
                SELECT  id
                FROM    rentals
                WHERE   "gameId" = $2 
                ORDER BY id DESC LIMIT 1
            ) AS rentals
            FROM games JOIN customers ON customers.id = $1
            WHERE games.id = $2`,
			[customerId, gameId]
		);

		if (gamePrice.rowCount === 0 || gamePrice.rows[0].rentals >= gamePrice.rows[0].stockTotal) {
			return res.sendStatus(400);
		}
		await db.query(
			`INSERT INTO rentals (
            "customerId",
            "gameId",
            "rentDate",
            "daysRented",
            "returnDate",
            "originalPrice",
            "delayFee"
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			[
				customerId,
				gameId,
				dayjs().format("YYYY-MM-DD"),
				daysRented,
				null,
				gamePrice.rows[0].pricePerDay * daysRented,
				null,
			]
		);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getRentals(req, res) {
	try {
		const rentals = (
			await db.query(`
                SELECT
                rentals.id,
                rentals."customerId",
                rentals."gameId",
                TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate",
                rentals."daysRented",
                TO_CHAR(rentals."returnDate", 'YYYY-MM-DD') AS "returnDate",
                rentals."originalPrice",
                rentals."delayFee",
                customers.id AS client_id,
                customers.name AS client_name,
                games.id AS game_id,
                games.name AS game_name
                FROM rentals 
                JOIN customers ON customers.id=rentals."customerId"
                JOIN games ON games.id = rentals."gameId";`)
		).rows.map((el) => {
			const customer = { id: el.client_id, name: el.client_name };
			const game = { id: el.game_id, name: el.game_name };
			delete el.client_id;
			delete el.client_name;
			delete el.game_id;
			delete el.game_name;
			return { ...el, customer, game };
		});
		res.status(200).send(rentals);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
export async function finishRental(req, res) {
	const { id } = req.params;

	try {
		const rental = await db.query(
			`SELECT 
            id,
            "customerId",
            "gameId",
            TO_CHAR("rentDate", 'YYYY-MM-DD') AS "rentDate",
            "daysRented",
            TO_CHAR("returnDate", 'YYYY-MM-DD') AS "returnDate",
            "originalPrice",
            "delayFee"
            FROM rentals 
            WHERE id=$1`,
			[id]
		);
		if (rental.rowCount === 0) return res.sendStatus(404);
		const today = dayjs().format("YYYY-MM-DD");
		const delayDays = (new Date(today) - new Date(rental.rows[0].rentDate)) / (1000 * 60 * 60 * 24);
		const delayFee = delayDays * rental.rows[0].originalPrice;

		const setRental = await db.query(
			`UPDATE rentals SET
            "returnDate"=$1,
            "delayFee"=$2
            WHERE id=$3
            AND "returnDate" IS NULL;
            `,
			[today, delayFee, id]
		);
		if (setRental.rowCount === 0) return res.sendStatus(400);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
