import { cpf } from "cpf-cnpj-validator"
import * as emailValidator from 'email-validator';
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { outsource } from "../../../../factory/entities/Outsource";
import { IUser } from "../../../../factory/intefaces/user/IUser"
import { OutsourceServices } from "../../../../factory/services/OutsourceServices";
import { UserServices } from "../../../../factory/services/UserServices"

export default class AddUserUseCase{
    public readonly result:IPresenter;

    constructor(presenter:IPresenter){
        this.result = presenter
    }
    verifyInput(input){
        const testUser = {
            name: "",
            cpf: "",
            cnh: "",
            email: "",
            phone: "",
            gender: "",
            address: "",
            city: "",
            age: "",
        }

        for (const key in input) {
            if(key in testUser){
                 continue
                }else{
                    if(key != "gender" && key != "address" && key != "city") throw new Error(`Unknown key: ${key}`)
                    continue  
                }
        }
    }
    async ExecuteAsync (_input:IUser){
        try {
            const userService = new UserServices
            const outsourceService = new OutsourceServices
            let userData:IUser

            if (Object.keys(_input).length === 0) throw new Error('Argument Cant Be Null')
            if (_input.id != null) throw new Error('No need to send ID')
            this.verifyInput(_input)

            if (_input.name.length < 3 || typeof _input.name != "string") throw new Error('Invalid Name')

            if(!emailValidator.validate(_input.email)) throw new Error('Invalid email')

            if (_input.cnh.length != 10 || typeof _input.cnh != "string") throw new Error('Invalid CNH')
            
            if (_input.phone.length < 3 || typeof _input.phone != "string") throw new Error('Invalid phone')

            if (_input.age.length < 1 || typeof _input.age != "string") throw new Error('Invalid age')
            
            //if(!cpf.isValid(_input.cpf)) throw new Error('Invalid CPF')

            let user = await userService.findUserByCpf(_input.cpf)
        
            if(user.message == "User Found!") throw new Error(`CPF already in use!`)

            user = await userService.findUserByCnh(_input.cnh)
            if(user.message == "User Found!") throw new Error(`CNH already in use!`)

            const outsourceCnh = await outsourceService.findOutsourceByCnh(_input.cnh)
            const outsource = await outsourceService.findOutsourceByCpf(_input.cpf)

            if(outsourceCnh.message == "Outsource Found!" && outsource.message != "Outsource Found!") throw new Error("This CNH belongs to a outsource registration!")
            if(outsourceCnh.message != "Outsource Found!" && outsource.message == "Outsource Found!") throw new Error("This CPF has another CNH registrated!")

            if(outsource.message == "Outsource Found!"){
                userData = {
                    name:outsource.outsource.name,
                    cpf: outsource.outsource.cpf,
                    cnh: outsource.outsource.cnh,
                    email:outsource.outsource.email,
                    phone:outsource.outsource.phone,
                    gender: _input.gender,
                    address: _input.address,
                    city: _input.city,
                    age: _input.age,
                    claims: outsource.outsource.claims,
                    active: true,
                    outsource: true
                }
                await outsourceService.outsourceNowUser(userData.cpf)
            }else{
                userData = {
                    name:_input.name,
                    cpf: _input.cpf,
                    cnh:_input.cnh,
                    email:_input.email,
                    phone:_input.phone,
                    gender: _input.gender,
                    address: _input.address,
                    city: _input.city,
                    age: _input.age,
                    claims: 0,
                    active: true,
                    outsource: false
                }
            }
            
            const resultAddUser = await userService.SaveNewUser(userData)
            
            this.result.RespondOk(resultAddUser, 201)

        } catch (error) {

            this.result.RespondInternalServerError(error.message, 400)
        }

    }
}
