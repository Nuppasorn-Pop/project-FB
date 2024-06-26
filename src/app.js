require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const notFoundMiddleware = require("./middleware/not-found");
const morgan = require("morgan");
const limiter = require("./middleware/rate-limit");
const authRouter = require("./routes/auth-route");
const userRouter = require("./routes/user-route");
const authenticate = require("./middleware/authenticate");
const relationshipRouter = require("./routes/relationship-route");
const postRouter = require("./routes/post-route");

const app = express();

app.use(cors());
app.use(morgan("dev")); // ช่วยในการ debug code ได้เร็วขึ้น
app.use(limiter); // จำกัดจำนวนผู้ใช้งาน
app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", authenticate, userRouter);
app.use("/relationships", authenticate, relationshipRouter);
app.use("/posts", authenticate, postRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
