import * as express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import { UserRepository } from "./repository/UserRepository";

dotenv.config();
const userRepo = new UserRepository();
const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
    try {
        const { id, name, email, password } = req.body;
        const user = await userRepo.createUser(id, name, email, password);
        res.json(user); // Retorna o usuário criado
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await userRepo.getAllUsers();
        res.json(users); // Retorna todos os usuários
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
    }
});

// Testando a conexão e inicializando o servidor
sequelize.sync({ force: true }).then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

}).catch((error) => { console.error("Erro ao conectar ao banco de dados:", error); });