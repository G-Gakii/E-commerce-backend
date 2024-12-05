import express from "express";
import "dotenv/config";
import userRouter from "./routes/user.routes";
const app = express();

app.use(express.json());
app.use("/api/ecommerce", userRouter);
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("listening at port ", port);
});
