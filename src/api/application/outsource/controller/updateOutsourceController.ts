import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import UpdateOutsourceUseCase from "../useCase/updateOutsourceUseCase";

export default class UpdateOutsourceController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){
      
      const useCaseResponse = new UpdateOutsourceUseCase(this.presenter)
      await useCaseResponse.ExecuteAsync(request.params.cpf, request.body)

      return this.presenter
    }
  
}