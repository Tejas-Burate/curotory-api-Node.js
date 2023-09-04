"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const employee_1 = __importDefault(require("./routes/employee")); // Corrected path to "routes"
const role_1 = __importDefault(require("./routes/role"));
const user_1 = __importDefault(require("./routes/user"));
const language_1 = __importDefault(require("./routes/language"));
const app = (0, express_1.default)();
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
//Routes
app.use('/employee', employee_1.default);
app.use("/", role_1.default);
app.use("/", user_1.default);
app.use("/", language_1.default);
const port = process.env.PORT || 8000;
db_1.default
    .authenticate()
    .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
})
    .catch((err) => {
    console.error('Error connecting to the database:', err);
});
