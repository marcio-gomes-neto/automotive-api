import { cpf } from "cpf-cnpj-validator";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IOutsource } from "../../../../factory/intefaces/outsource/IOutsource";
import { ClaimServices } from "../../../../factory/services/ClaimsServices";
import { OutsourceServices } from "../../../../factory/services/OutsourceServices";

export default class FindOutsourceClaimsUseCase{
    public readonly result:IPresenter;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (_input:IOutsource["cpf"]){
        try {
            const claimServices = new ClaimServices
            
            const outsourceServices = new OutsourceServices
            const user = await outsourceServices.findOutsourceByCpf(_input)
            if(user.message == "CPF not found") throw new Error("No outsource with informed CPF") 
            
            const resultFindOutsourceClaim = await claimServices.findClaimsFromOutsource(_input)
            this.result.RespondOk(resultFindOutsourceClaim, 200)
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }
}
