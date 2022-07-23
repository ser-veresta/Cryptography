import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { cipherRoute } from "./routes/cipher.route";
import { hashRoute } from "./routes/hash.route";
import { hmacRoute } from "./routes/hmac.route";
import { SignRoute } from "./routes/sign.route";
import { handleRes } from "./utils/response";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.get("/", (_, res) => {
  handleRes({ txt: "Welcome to the Server of Cryptography" }, res);
});

app.use("/hash", hashRoute);

app.use("/hmac", hmacRoute);

app.use("/cipher", cipherRoute);

app.use("/sign", SignRoute);

app.use((req, res) => {
  handleRes(
    { code: 404, txt: `Route ${req.originalUrl} Does not Exist !!` },
    res
  );
});

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  res.status(500).json({
    err: err.message || "Internal Error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started !!`);
});
