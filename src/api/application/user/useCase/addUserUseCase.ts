import { cpf } from "cpf-cnpj-validator"
import * as emailValidator from 'email-validator';
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IUser } from "../../../../factory/intefaces/user/IUser"
import { OutsourceServices } from "../../../../factory/services/OutsourceServices";
import { UserServices } from "../../../../factory/services/UserServices"

export default class AddUserUseCase{
    public readonly result;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (_input:IUser){
        try {
            const userService = new UserServices
            const outsourceService = new OutsourceServices
            let userData:IUser
            
            if (_input === undefined) throw new Error('Argument Cant Be Null')
            if (_input.id != null) throw new Error('No need to send ID')
    
            let keyWithNoSpace: string = _input.name.replace(/\s/g, '')

            if (_input.name.length < 3 || typeof _input.name != "string") throw new Error('Name must have at least 3 letters')

            if(!emailValidator.validate(_input.email)) throw new Error('Invalid email')

            _input.cnh.replace(/\s/g, '')
            if (_input.cnh.length != 10 || typeof _input.cnh != "string") throw new Error('Invalid CNH')
    
            keyWithNoSpace = _input.phone.replace(/\s/g, '')
            if (keyWithNoSpace.length < 3 || typeof _input.phone != "string") throw new Error('Invalid phone')

            keyWithNoSpace = _input.age.replace(/\s/g, '')
            if (keyWithNoSpace.length < 1 || typeof _input.age != "string") throw new Error('Invalid age')
            
            //if(!cpf.isValid(_input.cpf)) throw new Error('Invalid CPF')

            let user = await userService.findUserByCpf(_input.cpf)
            if(user.message == "User Found!") throw new Error(`CPF already in use!`)

            user = await userService.findUserByCnh(_input.cnh)
            if(user.message == "User Found!") throw new Error(`CNH already in use!`)

            const wasOutsource = await outsourceService.findOutsourceByCpf(userData.cpf)
            
            if(wasOutsource.message == "Outsource Found!"){
                userData = {
                    name:wasOutsource.outsource.name,
                    cpf: wasOutsource.outsource.cpf,
                    cnh: wasOutsource.outsource.cnh,
                    email:wasOutsource.outsource.email,
                    phone:wasOutsource.outsource.phone,
                    gender: _input.gender,
                    address: _input.address,
                    city: _input.city,
                    age: _input.age,
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
                    active: true,
                    outsource: false
                }

            }

            const resultAddUser = await userService.SaveNewUser(userData)
            
            this.result.RespondOk(resultAddUser)

        } catch (error) {

            this.result.RespondInternalServerError(error.message)
        }

    }
}
