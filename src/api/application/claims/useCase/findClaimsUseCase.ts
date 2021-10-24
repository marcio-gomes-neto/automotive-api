import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { ClaimServices } from "../../../../factory/services/ClaimsServices";
import { IClaims } from "../../../../factory/intefaces/claims/IClaims";

export default class FindClaimsUseCase{
    public readonly result;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async IdExecuteAsync (_input:IClaims["id"]){
        try {
            const claimServices = new ClaimServices
            const resultFindClaim = await claimServices.findClaimById(_input)

            this.result.RespondOk(resultFindClaim)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }

    async AllExecuteAsync (){
        try {
            const claimServices = new ClaimServices
            const resultFindAllClaims = await claimServices.findAllClaims()

            this.result.RespondOk(resultFindAllClaims)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }

    async TypeExecuteAsync(_input:IClaims["type"]){
        try {
            if(_input === null) throw new Error("Argument type cant be null!")
            const claimServices = new ClaimServices
            const resultFindClaim = await claimServices.findClaimsByType(_input)

            this.result.RespondOk(resultFindClaim)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }
}
