import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { ClaimServices } from "../../../../factory/services/ClaimsServices";
import { UserServices } from "../../../../factory/services/UserServices";
import { IUser } from "../../../../factory/intefaces/user/IUser";

export default class FindUserClaimsUseCase{
    public readonly result:IPresenter;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (_input:IUser["cpf"]){
        try {
            const userServices = new UserServices
            const claimServices = new ClaimServices
            const user = await userServices.findUserByCpf(_input)
            
            if(user.user.outsource === true){
                const result = { 
                    asOutsource: await claimServices.findClaimsFromOutsource(_input), 
                    asUser: await claimServices.findClaimsFromUser(_input) 
                }
                
                this.result.RespondOk(result, 200)
            }else{
                const resultFindUserClaim = await claimServices.findClaimsFromUser(_input)
                this.result.RespondOk(resultFindUserClaim, 200)
            }
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }
}
