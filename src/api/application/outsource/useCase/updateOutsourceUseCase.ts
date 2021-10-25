import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IOutsource } from "../../../../factory/intefaces/outsource/IOutsource";
import { IOutsourceUpdate } from "../../../../factory/intefaces/outsource/IOutsourceUpdate";
import { OutsourceServices } from "../../../../factory/services/OutsourceServices";

export default class UpdateOutsourceUseCase{
    public readonly result:IPresenter;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async ExecuteAsync (outsourceCpf:string, _input:IOutsourceUpdate){
        try {
            if (Object.keys(_input).length === 0) throw new Error('Argument Cant Be Null')
            const outsourceService = new OutsourceServices

            const updateOutsource = await outsourceService.findOutsourceByCpf(outsourceCpf)
            if(updateOutsource.message == "CPF not found") throw new Error('Invalid CPF')

            const outsourceData:IOutsourceUpdate = {}
            
            for(const key in _input){
                if( key!= "phone" && key!= "email") throw new Error(`Unknown key: ${key}`)

                if ( _input[key].length < 3 || typeof _input[key] != "string") throw new Error(`Invalid ${key}`)

                outsourceData[key] = _input[key]
            }
            
            
            const resultUpdateUser = await outsourceService.updateOutsource(outsourceCpf, outsourceData)

            this.result.RespondOk(resultUpdateUser, 200)

        } catch (error) {

            this.result.RespondInternalServerError(error.message, 400)
        }

    }
}
