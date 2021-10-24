import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { OutsourceServices } from "../../../../factory/services/OutsourceServices";
import { IOutsource } from "../../../../factory/intefaces/outsource/IOutsource";

export default class FindOutsourceUseCase{
    public readonly result;

    constructor(presenter:IPresenter){
        this.result = presenter
    }

    async IdExecuteAsync (_input:IOutsource["id"]){
        try {
            const outsourceServices = new OutsourceServices
            const resultFindOutsource = await outsourceServices.findOutsourceById(_input)

            this.result.RespondOk(resultFindOutsource)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }

    async AllExecuteAsync (){
        try {
            const outsourceServices = new OutsourceServices
            const resultFindAllOutsources = await outsourceServices.findAllOutsources()

            this.result.RespondOk(resultFindAllOutsources)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }

    async CpfExecuteAsync(_input:IOutsource["cpf"]){
        try {
            const outsourceServices = new OutsourceServices
            const resultFindOutsource = await outsourceServices.findOutsourceByCpf(_input)

            this.result.RespondOk(resultFindOutsource)
        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }

    async SomeExecuteAsync(_input:any){
        try {
            const outsourceServices = new OutsourceServices
    
            if(_input.name) {
                const resultFindOutsource = await outsourceServices.findOutsourceByName(_input.name)
                this.result.RespondOk(resultFindOutsource)
            } else {
                this.result.RespondOk({message: "Cannot search with selected query"})
            }

        } catch (error) {
            this.result.RespondInternalServerError(error.message)
        }
    }
}
