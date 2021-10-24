import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import EnableUserUseCase from "../useCase/enableUserUseCase";

export default class EnableUserController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){
      
      const useCaseResponse = new EnableUserUseCase(this.presenter)
      await useCaseResponse.ExecuteAsync(request.params.cpf)

      return this.presenter
    }
  
}