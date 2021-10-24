import { cpf } from "cpf-cnpj-validator"
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IUser } from "../../../../factory/intefaces/user/IUser"
import { UserServices } from "../../../../factory/services/UserServices"

export default class EnableUserUseCase{
    public readonly result;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (_input:IUser["cpf"]){
        try {
            
            if (_input === undefined) throw new Error('Argument Cant Be Null')
            if (typeof _input != "string") throw new Error('Invalid Argument')
            if (!cpf.isValid(_input)) throw new Error('CPF Invalid')

            const userService = new UserServices
            const resultEnableUser = await userService.enableUser(_input)

            this.result.RespondOk(resultEnableUser)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }
}