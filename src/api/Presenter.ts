import { IPresenter } from "../config/interfaces/IPresenter"

export class Presenter implements IPresenter{
    public body: any
    public code: any

    RespondOk (response: any, code: number): void {
      this.body = response
      this.code = code
    }
  
    RespondInternalServerError (exception: Error, code:number): void {
      this.body = exception
      this.code = 400
    }
}