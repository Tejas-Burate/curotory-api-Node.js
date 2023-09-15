"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const tz_1 = require("./config/tz");
const db_1 = __importDefault(require("./config/db"));
const employee_1 = __importDefault(require("./routes/employee")); // Corrected path to "routes"
const role_1 = __importDefault(require("./routes/role"));
const user_1 = __importDefault(require("./routes/user"));
const language_1 = __importDefault(require("./routes/language"));
const level_1 = __importDefault(require("./routes/level"));
const plan_1 = __importDefault(require("./routes/plan"));
const login_1 = __importDefault(require("./routes/login"));
const vedio_1 = __importDefault(require("./routes/vedio"));
const question_1 = __importDefault(require("./routes/question"));
const module_1 = __importDefault(require("./routes/module"));
const test_1 = __importDefault(require("./routes/test"));
const meeting_1 = __importDefault(require("./routes/meeting"));
const liveTest_1 = __importDefault(require("./routes/liveTest"));
const app = (0, express_1.default)();
moment_timezone_1.default.tz.setDefault("Asia/Kolkata");
console.log((0, tz_1.currentDateTime)());
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
// const timestamp = 1693560172596;
//Routes
app.use("/employee", employee_1.default);
app.use("/", role_1.default);
app.use("/", user_1.default);
app.use("/", language_1.default);
app.use("/", level_1.default);
app.use("/", plan_1.default);
app.use("/", login_1.default);
app.use("/", vedio_1.default);
app.use("/", question_1.default);
app.use("/", module_1.default);
app.use("/", test_1.default);
app.use("/", meeting_1.default);
app.use("/", liveTest_1.default);
const port = process.env.PORT || 8000;
db_1.default
    .authenticate()
    .then(() => {
    console.log(`Connected to the database`);
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
})
    .catch((err) => {
    console.error("Error connecting to the database:", err);
});
