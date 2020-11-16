import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./src/libs/globalErrorHandler";
import GlobalError from "./src/libs/globalError";
import api from "./src/routes/api";

const app = express();
// .env cofig
dotenv.config();
// open cors for connect
app.use(cors());
// morgan with dev mode
app.use(morgan("dev"));
// express json
app.use(express.json());
// UTF8 with json mode
app.use(express.urlencoded({
  extended: true
}));


//app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Welcome to Internet banking API !");
});

// API
app.use("/v1", api);

// Global error handler
app.all("*", async (req, res, next) => {
  const err = new GlobalError(`${req.originalUrl} does not exist on the server`, 404);
  next(err);
});
app.use(errorHandler);

// Init port : default port = 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listen at port ${PORT}`);
});