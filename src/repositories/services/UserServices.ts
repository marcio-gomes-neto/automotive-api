import {getConnectionManager, ConnectionManager, Connection} from "typeorm";
import { user } from "../entities/User";
import { UserRepository } from "../repository/UserRespository";
import { IUser } from "../intefaces/user/IUser";

export class UserServices{
    private readonly _userConn:Connection
    
    constructor(){
        const connectionManager = getConnectionManager();
        this._userConn = connectionManager.create({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "vehicle_secure_db",
            entities: [user],
        });       
    }

    async SaveNewUser(userData:IUser){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)
            await userRepo.saveUser(userData)
            return {message: "User Created With Sucess!",user: userData}
        } catch (error) {
            console.log(error)
        }
    }

}