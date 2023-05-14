import joi from "joi";

const clientSchema = joi.object({
	name: joi.string().min(3).max(100).required(),
	phone: joi.string().min(10).max(11).required(),
	cpf: joi.string().min(11).max(11).required(),
	birthday: joi
		.date()
		.max("01-01-2015")
		.iso()
		.messages({ "date.format": `Date format is YYYY-MM-DD` }),
});

export default clientSchema;
