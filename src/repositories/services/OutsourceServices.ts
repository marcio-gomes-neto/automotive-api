import { Connection, getConnectionManager } from "typeorm";
import { outsource } from "../entities/Outsource";
import { IOutsource } from "../intefaces/outsource/IOutsource";
import { IOutsourceUpdate } from "../intefaces/outsource/IOutsourceUpdate";
import { OutsourceRepository } from "../repository/OutsourceRepository";


export class OutsourceServices{
    private readonly _osConn:Connection

    constructor(){
        const connectionManager = getConnectionManager();
        this._osConn = connectionManager.create({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "vehicle_secure_db",
            entities: [outsource],
        })
    }
    
    async SaveNewOutsource(osData:IOutsource){
        try {
            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            await osRepo.saveOutsource(osData)
            this._osConn.close()

            return {message: "Outsource Created With Sucess!",outsource: osData}
        } catch (error) {
            console.log(error)
        }
    }
    
    async findOutsourceById(id:IOutsource["id"]){
        try {
            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            const findOutsource = await osRepo.findById(id)
            this._osConn.close()

            if(findOutsource){
                return {message: "User Found!",outsource: findOutsource}
            }
            return {message: "ID Not Found!"}
            
        } catch (error) {
            console.log(error)
        }
    }   

    async findAllOutsources(){
        try {
            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            const findOutsource = await osRepo.findAll()
            this._osConn.close()

            if(findOutsource){
                return {message: `There are ${findOutsource[1]} Outsource(s)!`,outsource: findOutsource}
            }
            return {message: "Unexpected Error!"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findOutsourceByCpf(cpf:IOutsource["cpf"]){
        try {
            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            const findOutsource = await osRepo.findByCpf(cpf)
            this._osConn.close()

            if(findOutsource){
                return {message: `User Found!`,outsource: findOutsource}
            }
            return {message: "CPF not found"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findOutsourceByName(name:IOutsource["name"]){
        try {
            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            const findOutsource = await osRepo.findByName(name)
            this._osConn.close()

            if(findOutsource){
                return {message: `There are ${findOutsource[1]} Outsource(s)!`,outsource: findOutsource}
            }
            return {message: "Name not found"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(cpf:string, data:IOutsourceUpdate){
        try {

            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            await osRepo.updateOutsource(cpf, data)
            const updatedOutsource = await osRepo.findByCpf(cpf)

            this._osConn.close()
            
            return {message: "User Updated!", outsource: updatedOutsource}
        } catch (error) {
            console.log(error)
        }
    }
}