import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { Presenter } from "../../../Presenter";
import  AddUserUseCase  from "../useCase/addUserUseCase";

export default class AddUserController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:any){

      const useCaseResponse = new AddUserUseCase(this.presenter)
      await useCaseResponse.ExecuteAsync(request)

      return this.presenter
    }
  
}