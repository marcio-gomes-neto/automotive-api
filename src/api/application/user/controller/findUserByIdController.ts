import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { Presenter } from "../../../Presenter";
import  findUserUseCase  from "../useCase/findUserUseCase";

export default class findUserByIdController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:any){

      const useCaseResponse = new findUserUseCase(this.presenter)
      await useCaseResponse.IdExecuteAsync(request)

      return this.presenter
    }
  
}