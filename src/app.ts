import { Request, Response } from "express";
import connectDb from "../src/dbconnection";
import config from "../src/config";
import countryController from "../src/controllers/countryControllers";

const express = require("express");
const app = express();
const http = require("http");
const PORT = config.PORT;
connectDb();

app.set("port", PORT);
app.use(express.json());

require("../src/dbconnection");

app.use("/api/v1/country", countryController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("api/v1/country", countryController);
export default app;
