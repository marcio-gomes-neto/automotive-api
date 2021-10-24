import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import AddClaimNoOutsourceUseCase from "../useCase/addClaimNoOutsourceUseCase";

export default class addClaimNoOutsourceController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){
        const useCaseResponse = new AddClaimNoOutsourceUseCase(this.presenter)

            await useCaseResponse.ExecuteAsync(request.params.cpf, request.body);
            return this.presenter   
    }
}