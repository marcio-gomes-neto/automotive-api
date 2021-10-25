import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IUser } from "../../../../factory/intefaces/user/IUser"
import { UserServices } from "../../../../factory/services/UserServices"

export default class FindUserUseCase{
    public readonly result:IPresenter;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async IdExecuteAsync (_input:IUser["id"]){
        try {
            const userService = new UserServices
            const resultFindUserById = await userService.findUserById(_input)

            this.result.RespondOk(resultFindUserById, 200)
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }

    async AllExecuteAsync (){
        try {
            const userService = new UserServices
            const resultFindAllUsers = await userService.findAllUsers()

            this.result.RespondOk(resultFindAllUsers, 200)
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }

    async CpfExecuteAsync(_input:IUser["cpf"]){
        try {
            const userService = new UserServices
            const resultFindAllUsers = await userService.findUserByCpf(_input)

            this.result.RespondOk(resultFindAllUsers, 200)
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }

    async SomeExecuteAsync(_input:any){
        try {
            const userService = new UserServices

            if(_input.name) {
                const resultFindAllUsers = await userService.findUsersByName(_input.name)
                this.result.RespondOk(resultFindAllUsers, 200)
            }else if (_input.gender){
                const resultFindAllUsers = await userService.findUsersByGender(_input.gender)
                this.result.RespondOk(resultFindAllUsers, 200)
            } else if (_input.city){
                const resultFindAllUsers = await userService.findUsersByCity(_input.city)
                this.result.RespondOk(resultFindAllUsers, 200)
            } else {
                this.result.RespondOk({message: "Cannot search with selected query"}, 200)
            }

        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }
}
