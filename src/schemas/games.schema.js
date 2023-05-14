import joi from "joi";

const gameSchema = joi.object({
	name: joi.string().min(3).max(100).required(),
	image: joi.string().required(),
	stockTotal: joi.number().integer().min(1).required(),
	pricePerDay: joi.number().integer().min(1).required(),
});

export default gameSchema;
