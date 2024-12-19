import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Authorization"],
  })
);

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import userRouter from "./routes/user.routes.js";
import repositoryRouter from "./routes/repository.routes.js";
import issueRouter from "./routes/issue.routes.js";

//routes decleration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/repository", repositoryRouter);
app.use("/api/v1/issue", issueRouter);

export { app };
