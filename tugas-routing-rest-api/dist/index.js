"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
express_1.default.static("public");
const path = require("path");
const PORT = 3000;
function init() {
    const app = (0, express_1.default)();
    app.get("/", (req, res) => {
        res.status(200).json({
            message: "OK",
            data: null,
        });
    });
    app.use(express_1.default.static(path.join(__dirname, '../public')));
    app.get("/hello", (req, res) => {
        res.json({
            message: 'Success fetch message',
            data: 'Hello World!'
        });
    });
    app.get("/user", (req, res) => {
        res.json({
            message: "Succes fetch user",
            data: {
                id: 1,
                name: "Budi",
                username: "budidu",
                email: "budidu@gmail.com"
            }
        });
    });
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
init();
