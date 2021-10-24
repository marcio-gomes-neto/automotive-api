import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import  FindOutsourceUseCase  from "../useCase/findOutsourceUseCase";

export default class findAllOutsourcesController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){
        const useCaseResponse = new FindOutsourceUseCase(this.presenter)

        if(Object.keys(request.query).length === 0) {
            await useCaseResponse.AllExecuteAsync();
            return this.presenter
        }
            await useCaseResponse.SomeExecuteAsync(request.query); 
            return this.presenter
        
    }
}