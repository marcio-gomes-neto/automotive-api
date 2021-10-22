import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IUser } from "../../../../repositories/intefaces/user/IUser"
import { UserServices } from "../../../../repositories/services/UserServices"

export default class FindUserUseCase{
    public readonly result;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async IdExecuteAsync (_input:IUser){
        const userService = new UserServices
        const resultAddUser = await userService

    }
}
