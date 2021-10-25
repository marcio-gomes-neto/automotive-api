import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { OutsourceServices } from "../../../../factory/services/OutsourceServices";
import { IOutsource } from "../../../../factory/intefaces/outsource/IOutsource";

export default class FindOutsourceUseCase{
    public readonly result:IPresenter;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async IdExecuteAsync (_input:IOutsource["id"]){
        try {
            const outsourceServices = new OutsourceServices
            const resultFindOutsource = await outsourceServices.findOutsourceById(_input)

            this.result.RespondOk(resultFindOutsource, 200)
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }

    async AllExecuteAsync (){
        try {
            const outsourceServices = new OutsourceServices
            const resultFindAllOutsources = await outsourceServices.findAllOutsources()

            this.result.RespondOk(resultFindAllOutsources, 200)
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }

    async CpfExecuteAsync(_input:IOutsource["cpf"]){
        try {
            const outsourceServices = new OutsourceServices
            const resultFindOutsource = await outsourceServices.findOutsourceByCpf(_input)

            this.result.RespondOk(resultFindOutsource, 200 )
        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400)
        }
    }

    async SomeExecuteAsync(_input:any){
        try {
            const outsourceServices = new OutsourceServices
    
            if(_input.name) {
                const resultFindOutsource = await outsourceServices.findOutsourceByName(_input.name)
                this.result.RespondOk(resultFindOutsource, 200 )
            } else {
                this.result.RespondOk({message: "Cannot search with selected query"}, 200)
            }

        } catch (error) {
            this.result.RespondInternalServerError(error.message, 400 )
        }
    }
}
