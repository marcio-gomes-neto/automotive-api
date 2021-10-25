import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { ClaimServices } from "../../../../factory/services/ClaimsServices";
import { IClaims } from "../../../../factory/intefaces/claims/IClaims";

export default class FindClaimsUseCase{
    public readonly result:IPresenter;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async IdExecuteAsync (_input:IClaims["id"]){
        try {
            const claimServices = new ClaimServices
            const resultFindClaim = await claimServices.findClaimById(_input)

            this.result.RespondOk(resultFindClaim, 200)
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }

    async AllExecuteAsync (){
        try {
            const claimServices = new ClaimServices
            const resultFindAllClaims = await claimServices.findAllClaims()

            this.result.RespondOk(resultFindAllClaims, 200)
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }

    async SomeExecuteAsync(_input:any){
        try {
            const claimServices = new ClaimServices
            if(_input.type) {
                const resultFindClaim = await claimServices.findClaimsByType(_input.type)
                this.result.RespondOk(resultFindClaim, 200 )
            } else if(_input.vehicle){
                const resultFindClaim = await claimServices.findClaimsByVehicles(_input.vehicle)
                this.result.RespondOk(resultFindClaim, 200 )
            }else{
                this.result.RespondOk({message: "Cannot search with selected query"}, 200)
            }

        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400 )
        }
    }
}
