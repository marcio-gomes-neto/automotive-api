import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import FindOutsourceUseCase from "../useCase/findOutsourceUseCase";

export default class findOutsourceByIdController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){

      const useCaseResponse = new FindOutsourceUseCase(this.presenter)
      await useCaseResponse.IdExecuteAsync(request.params.id)

      return this.presenter
    }
  
}