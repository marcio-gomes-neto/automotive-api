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
            if (Object.keys(_input).length === 0) throw new Error('Argument Cant Be Null')
            const userService = new UserServices

            const updateUser = await userService.findUserByCpf(userCpf)
            if(updateUser.message == "CPF not found") throw new Error('Invalid CPF')

            const userData:IUserUpdate = {}
            
            for(const key in _input){
                if(key != "gender" && key!= "city" && key!= "phone" && key!= "address" && key!= "email") throw new Error(`Unknown key: ${key}`)
                if (_input[key].length < 0 || typeof _input[key] != "string") throw new Error(`Invalid ${key}`)
                
                userData[key] = _input[key]
            }
            
            
            const resultUpdateUser = await userService.updateUser(userCpf, userData)
            
            this.result.RespondOk(resultUpdateUser, 200)

        } catch (error) {

            this.result.RespondInternalServerError(error.message, 400)
        }

    }
}
