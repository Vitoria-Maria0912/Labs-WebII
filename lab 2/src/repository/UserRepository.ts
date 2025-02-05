import { User } from "../models/User";

export class UserRepository {

    // Criar um novo usuário
    async createUser(id: number, name: string, email: string, password: string) {
        // Use o método `create` para salvar no banco de dados
        return await User.create({
            id,
            name,
            email,
            password
            });
        }
    async getAllUsers() { return await User.findAll(); }
}