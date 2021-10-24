import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import FindOutsourceClaimsUseCase from "../useCase/findOutsourceClaimsUseCase";

export default class findUserClaimsController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){
        const useCaseResponse = new FindOutsourceClaimsUseCase(this.presenter)

            await useCaseResponse.ExecuteAsync(request.query.cpf); 
            return this.presenter 
    }
}