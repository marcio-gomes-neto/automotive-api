import { cpf } from "cpf-cnpj-validator";
import * as emailValidator from 'email-validator';
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { user } from "../../../../factory/entities/User";
import { IClaims } from "../../../../factory/intefaces/claims/IClaims";
import { IOutsource } from "../../../../factory/intefaces/outsource/IOutsource";
import { IUser } from "../../../../factory/intefaces/user/IUser";
import { ClaimServices } from "../../../../factory/services/ClaimsServices";
import { OutsourceServices } from "../../../../factory/services/OutsourceServices";
import { UserServices } from "../../../../factory/services/UserServices";

export default class AddClaimWithOutsourceUseCase{
    public readonly result:IPresenter;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (userCpf:IUser["cpf"], _input: {claim: IClaims, outsource: IOutsource}){
        try {
            
            if(Object.keys(_input.claim).length === 0) throw new Error('Claim argument invalid')
            if(Object.keys(_input.outsource).length === 0) throw new Error('Outsource argument invalid')

            const outsourceServices = new OutsourceServices
            const claimServices = new ClaimServices
            const userServices = new UserServices

            const user = await userServices.findUserByCpf(userCpf)
            if( user.message == "CPF not found") throw new Error("User Not Found!")

            if(_input.outsource.id) throw new Error('No need to send ID')
            if(!cpf.isValid(_input.outsource.cpf) || _input.outsource.cpf == userCpf) throw new Error('Invalid Outsource CPF')
             
            const findUserCNH = await userServices.findUserByCnh(_input.outsource.cnh)
            if(findUserCNH.message == "User found!") throw new Error("This CNH belongs to a user!")

            const findOutsourceCPF = await outsourceServices.findOutsourceByCpf(_input.outsource.cpf)
            
            if(findOutsourceCPF.message == "CPF not found" ){
                
                if(!emailValidator.validate(_input.outsource.email)) throw new Error('Invalid email')
            
                if (_input.outsource.cnh.length != 10 || typeof _input.outsource.cnh != "string") throw new Error('Invalid CNH')
                
                if (_input.outsource.name.length < 3 || typeof _input.outsource.name != "string") throw new Error('Invalid email')
        
                if (_input.outsource.phone.length < 3 || typeof _input.outsource.phone != "string") throw new Error('Invalid phone')

                const outsource:IOutsource = {
                    name: _input.outsource.name,
                    cpf: _input.outsource.cpf,
                    cnh: _input.outsource.cnh,
                    email: _input.outsource.email,
                    phone: _input.outsource.phone,
                    claims: 1,
                    user: false
                }
                await outsourceServices.SaveNewOutsource(outsource)
            } else {
                if(findOutsourceCPF.outsource.user) {
                    await userServices.addOneClaim(_input.outsource.cpf)
                } else {
                    const findOutSourceCNH = await outsourceServices.findOutsourceByCnh(_input.outsource.cnh)
                    if(findOutSourceCNH.message == "Outsource found!") throw new Error("This CNH belongs to another outsource!")
                   
                    await outsourceServices.addOneClaim(_input.outsource.cpf)
                }
            }

            if(_input.claim.id) throw new Error ("No need to send ID")

            if (_input.claim.desc.length < 3 || typeof _input.claim.desc != "string") throw new Error('Invalid description')

            if (_input.claim.type.length < 3 || typeof _input.claim.type != "string") throw new Error('Invalid type')

            if (_input.claim.vehicle.length < 3 || typeof _input.claim.vehicle != "string") throw new Error('Invalid Vehicle')
            
            const claim:IClaims = {
                desc: _input.claim.desc,
                type: _input.claim.type,
                vehicle: _input.claim.vehicle,
                cpf_user: userCpf,
                cpf_outsource:_input.outsource.cpf
            }
            await userServices.addOneClaim(userCpf)
            
            const resultFindAllOutsource = await claimServices.saveNewClaim(claim)
            
            this.result.RespondOk(resultFindAllOutsource, 201)
            return
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }
}
