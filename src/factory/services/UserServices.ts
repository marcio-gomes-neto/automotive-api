import {getConnectionManager, ConnectionManager, Connection} from "typeorm";
import { user } from "../entities/User";
import { UserRepository } from "../repository/UserRespository";
import { IUser } from "../intefaces/user/IUser";
import { IUserUpdate } from "../intefaces/user/IUserUpdate";

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
            await this._userConn.close()

            return {message: "User Created With Sucess!",user: userData}
        } catch (error) {
            console.log(error)
        }
    }

    async findUserById(id:IUser["id"]){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            const findUser = await userRepo.findById(id)
            await this._userConn.close()

            if(findUser){
                return {message: "User Found!",user: findUser}
            }
            return {message: "ID Not Found!"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findAllUsers(){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            const findUser = await userRepo.findAll()
            await this._userConn.close()

            if(findUser){
                return {message: `There are ${findUser[1]} Users!`,users: findUser}
            }
            return {message: "Unexpected Error!"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findUserByCpf(cpf:IUser["cpf"]){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            const findUser = await userRepo.findByCpf(cpf)
            await this._userConn.close()

            if(findUser){
                return {message: `User Found!`,user: findUser}
            }
            return {message: "CPF not found"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findUserByCnh(cnh:IUser["cnh"]){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            const findUser = await userRepo.findByCnh(cnh)
            await this._userConn.close()

            if(findUser){
                return {message: `User Found!`,user: findUser}
            }
            return {message: "CNH not found"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findUsersByName(name:IUser["name"]){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            const findUser = await userRepo.findByName(name)
            await this._userConn.close()  

            if(findUser[1] == 0){
                return {message: "Name not found"}
            }
            return {message: `There are ${findUser[1]} User(s)!`,users: findUser}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findUsersByGender(gender:IUser["gender"]){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            const findUser = await userRepo.findByGender(gender)
            await this._userConn.close()

            if(findUser[1] == 0){
                return {message: "Gender not found"}
               
            }
            return {message: `There are ${findUser[1]} Users!`,users: findUser} 
            
        } catch (error) {
            console.log(error)
        }
    }

    async findUsersByCity(city:IUser["city"]){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            const findUser = await userRepo.findByCity(city)
            await this._userConn.close()

            if(findUser[1] == 0){
                return {message: "City not found"}
            }
            return {message: `There are ${findUser[1]} Users!`,users: findUser}
            
            
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(cpf:string, userData:IUserUpdate){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            await userRepo.updateUser(cpf, userData)
            const updateUser = await userRepo.findByCpf(cpf)
            await this._userConn.close()
            
            return {message: "User Updated!", user: updateUser}
        } catch (error) {
            console.log(error)
        }
    }

    async disableUser(cpf:string){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            await userRepo.disableUser(cpf)
            const disabledUser = await userRepo.findByCpf(cpf)
            await this._userConn.close()

            return {message: "User Disabled!", user: disabledUser}
        } catch (error) {
            console.log(error)
        }
    }

    async enableUser(cpf:string){
        try {
            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            await userRepo.enableUser(cpf)
            const enabledUser = await userRepo.findByCpf(cpf)
            await this._userConn.close()

            return {message: "User Enabled!", user: enabledUser}
        } catch (error) {
            console.log(error)
        }
    }

    async addOneClaim(cpf:string){
        try {

            await this._userConn.connect()
            const userRepo = this._userConn.getCustomRepository(UserRepository)

            await userRepo.addOneClaim(cpf)

            await this._userConn.close()
        } catch (error) {
            console.log(error)
        }

    }
}