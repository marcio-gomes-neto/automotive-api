import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IUser } from "../../../../repositories/intefaces/user/IUser"
import { UserServices } from "../../../../repositories/services/UserServices"

export default class FindUserUseCase{
    public readonly result;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async IdExecuteAsync (_input:IUser["id"]){
        try {
            const userService = new UserServices
            const resultFindUserById = await userService.findUserById(_input)

            this.result.RespondOk(resultFindUserById)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }

    async AllExecuteAsync (){
        try {
            const userService = new UserServices
            const resultFindAllUsers = await userService.findAllUsers()

            this.result.RespondOk(resultFindAllUsers)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }

    async CpfExecuteAsync(_input:IUser["cpf"]){
        try {
            const userService = new UserServices
            const resultFindAllUsers = await userService.findUserByCpf(_input)

            this.result.RespondOk(resultFindAllUsers)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }

    async SomeExecuteAsync(_input:any){
        try {
            const userService = new UserServices
            let resultFindAllUsers

            if(_input.name) {
                resultFindAllUsers = await userService.findUsersByName(_input.name)
            }else if (_input.gender){
                resultFindAllUsers = await userService.findUsersByGender(_input.gender)
            } else if (_input.city){
                resultFindAllUsers = await userService.findUsersByCity(_input.city)
            } else {
                this.result.RespondOk({message: "Cannot search with selected query"})
            }

            this.result.RespondOk(resultFindAllUsers)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }
}
