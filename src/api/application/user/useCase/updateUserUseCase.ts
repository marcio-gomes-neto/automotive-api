import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IUserUpdate } from "../../../../factory/intefaces/user/IUserUpdate";
import { UserServices } from "../../../../factory/services/UserServices"

export default class UpdateUserUseCase{
    public readonly result;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (userCpf:string, _input:IUserUpdate){
        try {
            if (_input === undefined) throw new Error('Argument Cant Be Null')
            if (userCpf === undefined) throw new Error('CPF cant be Null')

            const userData:IUserUpdate = {}
            
            for(const key in _input){
                if(key != "gender" && key!= "city" && key!= "phone" && key!= "address" && key!= "email") throw new Error(`Unexpected Key '${key}'`)
                let keyWithNoSpace = _input[key].replace(/\s/g, '')
                if (keyWithNoSpace.length < 3 || keyWithNoSpace === null || keyWithNoSpace === undefined) throw new Error(`Invalid ${key}`)
                
                if(typeof _input[key] != "string") throw new Error(`Invalid ${key}`)
                userData[key] = _input[key]
            }
            
            const userService = new UserServices
            const resultUpdateUser = await userService.updateUser(userCpf, userData)
            
            this.result.RespondOk(resultUpdateUser)

        } catch (error) {

            this.result.RespondInternalServerError(error.message)
        }

    }
}
