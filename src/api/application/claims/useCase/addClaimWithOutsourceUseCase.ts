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
    public readonly result;

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

            let keyWithNoSpace

            if(_input.outsource.id) throw new Error('No need to send ID')
            
            if(!cpf.isValid(_input.outsource.cpf)) throw new Error('Invalid CPF')

            if(!emailValidator.validate(_input.outsource.email)) throw new Error('Invalid email')
            

            _input.outsource.cnh.replace(/\s/g, '')
            if (_input.outsource.cnh.length != 10 || typeof _input.outsource.cnh != "string") throw new Error('Invalid CNH')
            
            keyWithNoSpace =_input.outsource.name.replace(/\s/g, '')
            if (keyWithNoSpace.length < 3 || typeof _input.outsource.name != "string") throw new Error('Invalid email')
    
            keyWithNoSpace = _input.outsource.phone.replace(/\s/g, '')
            if (keyWithNoSpace.length < 3 || typeof _input.outsource.phone != "string") throw new Error('Invalid phone')
            
            const findOutsourceCPF = await outsourceServices.findOutsourceByCpf(_input.outsource.cpf)
            
            if(findOutsourceCPF.message == "CPF not found"){

                const findOutSourceCNH = await outsourceServices.findOutsourceByCnh(_input.outsource.cnh)
                if(findOutSourceCNH.message == "Outsource found!") throw new Error("CNH already exists")

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
                await outsourceServices.addOneClaim(_input.outsource.cpf)
            }

            if(_input.claim.id) throw new Error ("No need to send ID")

            keyWithNoSpace =_input.claim.desc.replace(/\s/g, '')
            if (keyWithNoSpace.length < 3 || typeof _input.claim.desc != "string") throw new Error('Invalid description')
    
            keyWithNoSpace = _input.claim.type.replace(/\s/g, '')
            if (keyWithNoSpace.length < 3 || typeof _input.claim.type != "string") throw new Error('Invalid type')
            
            const claim:IClaims = {
                desc: _input.claim.desc,
                type: _input.claim.type,
                cpf_user: userCpf,
                cpf_outsource:_input.outsource.cpf
            }
            await userServices.addOneClaim(userCpf)
            const resultFindAllOutsource = await claimServices.saveNewClaim(claim)
            this.result.RespondOk(resultFindAllOutsource)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }
}
