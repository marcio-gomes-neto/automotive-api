import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IOutsource } from "../../../../factory/intefaces/outsource/IOutsource";
import { IOutsourceUpdate } from "../../../../factory/intefaces/outsource/IOutsourceUpdate";
import { OutsourceServices } from "../../../../factory/services/OutsourceServices";

export default class UpdateOutsourceUseCase{
    public readonly result;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (outsourceCpf:string, _input:IOutsourceUpdate){
        try {
            if (_input === undefined) throw new Error('Argument Cant Be Null')
            if (outsourceCpf === undefined) throw new Error('CPF cant be Null')

            const outsourceData:IOutsourceUpdate = {}
            
            for(const key in _input){
                if( key!= "phone" && key!= "email") throw new Error(`Unexpected Key '${key}'`)
                let keyWithNoSpace = _input[key].replace(/\s/g, '')
                if (keyWithNoSpace.length < 3 || keyWithNoSpace === null || keyWithNoSpace === undefined) throw new Error(`Invalid ${key}`)
                
                if(typeof _input[key] != "string") throw new Error(`Invalid ${key}`)
                outsourceData[key] = _input[key]
            }
            
            const outsourceService = new OutsourceServices
            const resultUpdateUser = await outsourceService.updateUser(outsourceCpf, outsourceData)

            this.result.RespondOk(resultUpdateUser)

        } catch (error) {

            this.result.RespondInternalServerError(error.message)
        }

    }
}
