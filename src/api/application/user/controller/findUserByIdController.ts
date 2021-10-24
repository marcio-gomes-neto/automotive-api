import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import  FindUserUseCase  from "../useCase/findUserUseCase";

export default class findUserByIdController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){

      const useCaseResponse = new FindUserUseCase(this.presenter)
      await useCaseResponse.IdExecuteAsync(request.params.id)

      return this.presenter
    }
  
}