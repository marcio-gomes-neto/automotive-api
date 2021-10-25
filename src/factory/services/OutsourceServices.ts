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
            await this._osConn.close()

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
            await this._osConn.close()

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
            await this._osConn.close()

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
            await this._osConn.close()

            if(findOutsource){
                return {message: `Outsource Found!`,outsource: findOutsource}
            }
            return {message: "CPF not found"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findOutsourceByCnh(cnh:IOutsource["cpf"]){
        try {
            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            const findOutsource = await osRepo.findByCnh(cnh)
            await this._osConn.close()

            if(findOutsource){
                return {message: `Outsource Found!`,outsource: findOutsource}
            }
            return {message: "CNH not found"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findOutsourceByName(name:IOutsource["name"]){
        try {
            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            const findOutsource = await osRepo.findByName(name)
            await this._osConn.close()

            if(findOutsource[1] == 0){
                return {message: "Name not found"}
                
            }
            return {message: `There are ${findOutsource[1]} Outsource(s)!`,outsource: findOutsource}
            
        } catch (error) {
            console.log(error)
        }
    }

    async updateOutsource(cpf:string, data:IOutsourceUpdate){
        try {

            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            await osRepo.updateOutsource(cpf, data)
            const updatedOutsource = await osRepo.findByCpf(cpf)

            await this._osConn.close()
            
            return {message: "Outsource Updated!", outsource: updatedOutsource}
        } catch (error) {
            console.log(error)
        }
    }

    async addOneClaim(cpf:string){
        try {

            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            await osRepo.addOneClaim(cpf)

            await this._osConn.close()
        } catch (error) {
            console.log(error)
        }

    }

    async outsourceNowUser(cpf:string){
        try {

            await this._osConn.connect()
            const osRepo = this._osConn.getCustomRepository(OutsourceRepository)

            await osRepo.nowUser(cpf)

            await this._osConn.close()
        } catch (error) {
            console.log(error)
        }

    }
}