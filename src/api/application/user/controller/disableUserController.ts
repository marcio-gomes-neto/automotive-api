import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import DisableUserUseCase from "../useCase/disableUserUseCase";

export default class DisableUserController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){
      
      const useCaseResponse = new DisableUserUseCase(this.presenter)
      await useCaseResponse.ExecuteAsync(request.params.cpf)

      return this.presenter
    }
  
}