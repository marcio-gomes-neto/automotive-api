import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IClaims } from "../../../../factory/intefaces/claims/IClaims";
import { IUser } from "../../../../factory/intefaces/user/IUser";
import { ClaimServices } from "../../../../factory/services/ClaimsServices";
import { UserServices } from "../../../../factory/services/UserServices";

export default class AddClaimNoOutsourceUseCase{
    public readonly result:IPresenter;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (userCpf:IUser["cpf"], _input: IClaims){
        try {
            if(Object.keys(_input).length === 0) throw new Error('Invalid Argument')

            const claimServices = new ClaimServices
            const userServices = new UserServices

            const user = await userServices.findUserByCpf(userCpf)
            if( user.message == "CPF not found") throw new Error("User Not Found!")

            if(_input.id) throw new Error ("No need to send ID")

            if (_input.desc.length < 3 || typeof _input.desc != "string") throw new Error('Invalid description')

            if (_input.type.length < 3 || typeof _input.type != "string") throw new Error('Invalid type')

            if (_input.vehicle.length < 3 || typeof _input.vehicle != "string") throw new Error('Invalid Vehicle')

            const claim:IClaims = {
                desc: _input.desc,
                type: _input.type,
                vehicle: _input.vehicle,
                cpf_user: userCpf
            }

            await userServices.addOneClaim(userCpf)
            const resultFindAllOutsource = await claimServices.saveNewClaim(claim)
            this.result.RespondOk(resultFindAllOutsource, 201)
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }
}
