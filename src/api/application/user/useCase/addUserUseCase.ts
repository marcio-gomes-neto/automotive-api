import { cpf } from "cpf-cnpj-validator"
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IUser } from "../../../../repositories/intefaces/user/IUser"
import { UserServices } from "../../../../repositories/services/UserServices"

export default class AddUserUseCase{
    public readonly result;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (_input:IUser){
        try {

            if (_input === undefined) throw new Error('Argument Cant Be Null')
            if (_input.id != null) throw new Error('No need to send ID')
    
            let keyWithNoSpace: string = _input.name.replace(/\s/g, '')
            if (keyWithNoSpace.length < 3 || _input.name === null || _input.name === undefined) throw new Error('Name must have at least 3 letters')
            
            //if(!cpf.isValid(_input.cpf)) throw new Error('Invalid CPF')

            _input.cnh.replace(/\s/g, '')
            if (_input.cnh.length != 10 || _input.cnh === null || _input.cnh === undefined) throw new Error('Invalid CNH')
            
            keyWithNoSpace = _input.email.replace(/\s/g, '')
            if (keyWithNoSpace.length < 3 || _input.email === null || _input.email === undefined) throw new Error('Invalid email')
    
            keyWithNoSpace = _input.phone.replace(/\s/g, '')
            if (keyWithNoSpace.length < 3 || _input.phone === null || _input.phone === undefined) throw new Error('Invalid phone')

            keyWithNoSpace = _input.age.replace(/\s/g, '')
            if (keyWithNoSpace.length < 1 || _input.age === null || _input.age === undefined) throw new Error('Invalid age')

            
            const userData:IUser = {
                name:"",
                cpf: "",
                cnh:"",
                email:"",
                phone:"",
                gender: "",
                address: "",
                city: "",
                age: "",
                active: true,
                outsource: false
            }
    
            for(const key in _input){
                if(key!= "name" && key!= "cpf" && key!= "cnh" && key != "gender" && key!= "city" && key!= "phone" && key!= "address" && key!= "email" &&  key!= "age") throw new Error(`Unexpected Key '${key}'`)
                if(typeof _input[key] != "string") throw new Error(`Invalid ${key}`)
                userData[key] = _input[key]
            }
            
            const userService = new UserServices
            const resultAddUser = await userService.SaveNewUser(userData)
            
            this.result.RespondOk(resultAddUser)

        } catch (error) {

            this.result.RespondInternalServerError(error.message)
        }

    }
}
