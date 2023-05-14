import express, { json } from "express";
import cors from "cors";
import routers from "./routes/index.router.js";

const app = express();
const PORT = 5000;
app.use(json());
app.use(cors());
app.use(routers);

app.listen(PORT, () => console.log(`Server online in port: ${PORT}`));
