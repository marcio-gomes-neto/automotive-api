import { Connection, getConnectionManager } from "typeorm";
import { claims } from "../entities/Claims";
import { IClaims } from "../intefaces/claims/IClaims";
import { IOutsource } from "../intefaces/outsource/IOutsource";
import { IUser } from "../intefaces/user/IUser";
import { ClaimsRepository } from "../repository/ClaimsRepository";

export class ClaimServices{
    private readonly _claimsConn:Connection

    constructor(){
        const connectionManager = getConnectionManager()
        this._claimsConn = connectionManager.create({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "vehicle_secure_db",
            entities: [claims],

        });
    }

    async saveNewClaim(claimData:IClaims){
        try {
            await this._claimsConn.connect()
            const claimsRepo = this._claimsConn.getCustomRepository(ClaimsRepository)
            
            await claimsRepo.saveClaim(claimData)
            await this._claimsConn.close()

            return {message: "Claim Created With Sucess!", claim: claimData}
        } catch (error) {
            console.log(error)
        }

    }

    async findAllClaims(){
        try {
            await this._claimsConn.connect()
            const claimsRepo = this._claimsConn.getCustomRepository(ClaimsRepository)

            const findClaim = await claimsRepo.findAll()
            await this._claimsConn.close()

            if(findClaim){
                return {message: `There are ${findClaim[1]} Claim(s)!`,claims: findClaim}
            }
            return {message: "Unexpected Error!"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findClaimById(id:IClaims["id"]){
        try {
            await this._claimsConn.connect()
            const claimsRepo = this._claimsConn.getCustomRepository(ClaimsRepository)

            const findClaim = await claimsRepo.findById(id)
            await this._claimsConn.close()

            if(findClaim){
                return {message: "Claim Found!",claim: findClaim}
            }
            return {message: "ID Not Found!"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findClaimsFromUser(cpf:IUser["cpf"]){
        try {
            await this._claimsConn.connect()
            const claimsRepo = this._claimsConn.getCustomRepository(ClaimsRepository)

            const findClaim = await claimsRepo.findClaimsFromUser(cpf)
            await this._claimsConn.close()

            if(findClaim[1] == 0){
                return {message: "User has no claims!"}
            }else{
                return {message: `User has ${findClaim[1]} claim(s)!`, claims:findClaim[0]}
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async findClaimsFromOutsource(cpf:IOutsource["cpf"]){
        try {
            await this._claimsConn.connect()
            const claimsRepo = this._claimsConn.getCustomRepository(ClaimsRepository)

            const findClaim = await claimsRepo.findClaimsFromOutsource(cpf)
            await this._claimsConn.close()

            if(findClaim[1] == 0){
                return {message: "Outsource has no claims!"}
            }else{
                return {message: `Outsource has ${findClaim[1]} claim(s)!`, claims:findClaim[0]}
            }

        } catch (error) {
            console.log(error)
        }
    }

    async findClaimsByType(type: IClaims["type"]){
        try {
            await this._claimsConn.connect()
            const claimsRepo = this._claimsConn.getCustomRepository(ClaimsRepository)

            const findClaim = await claimsRepo.findByType(type)
            await this._claimsConn.close()

            if(findClaim[1] == 0){
                return {message: "There are no Claims with this type!"}
            }else{
                return {message: `There are ${findClaim[1]} ${type} claim(s)!`, claims:findClaim[0]}
            }
        } catch (error) {
            console.log(error)
        }
            
    }

    async findClaimsByVehicles(vehicle: IClaims["vehicle"]){
        try {
            await this._claimsConn.connect()
            const claimsRepo = this._claimsConn.getCustomRepository(ClaimsRepository)

            const findClaim = await claimsRepo.findByVehicle(vehicle)
            await this._claimsConn.close()

            if(findClaim[1] == 0){
                return {message: "There are no Claims with this vehicle!"}
            }else{
                return {message: `There are ${findClaim[1]} ${vehicle} claim(s)!`, claims:findClaim[0]}
            }
        } catch (error) {
            console.log(error)
        }
            
    }
}