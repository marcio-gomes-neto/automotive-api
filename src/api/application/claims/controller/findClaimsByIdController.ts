import { IController } from "../../../../config/interfaces/IController";
import { IPresenter } from "../../../../config/interfaces/IPresenter";
import { IRequest } from "../../../../config/interfaces/IRequest";
import { Presenter } from "../../../Presenter";
import FindClaimsUseCase from "../useCase/findClaimsUseCase";

export default class findClaimByIdController implements IController{
    private readonly presenter: IPresenter
    
    constructor(){
      this.presenter = new Presenter()
    }

    public async Handle(request:IRequest){
        const useCaseResponse = new FindClaimsUseCase(this.presenter)

            await useCaseResponse.IdExecuteAsync(request.params.id); 
            return this.presenter 
    }
}