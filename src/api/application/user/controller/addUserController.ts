import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import  AddUserUseCase  from "../useCase/addUserUseCase";

export default class AddUserController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){
      
      const useCaseResponse = new AddUserUseCase(this.presenter)
      await useCaseResponse.ExecuteAsync(request.body)

      return this.presenter
    }
  
}