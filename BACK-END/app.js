const express = require("express");
const bodyParser = require("body-parser");
const incomeRouter = require("./routes/incomeRoutes");
const expenseRouter = require("./routes/expenseRoutes")
const categoryRouter = require("./routes/categoryRoutes")
const userRouter = require("./routes/userRoutes");
const budgetRouter = require("./routes/budgetRoutes");
const cors = require('cors');
const cookieParser = require("cookie-parser")

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true
}


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/incomes", incomeRouter);
app.use("/expenses", expenseRouter);
app.use("/categories", categoryRouter);
app.use("/budget", budgetRouter);
app.use("/users", userRouter);

module.exports = app;
