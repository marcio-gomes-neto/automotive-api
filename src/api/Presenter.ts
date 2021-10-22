import { IPresenter } from "../config/interfaces/IPresenter"

export class Presenter implements IPresenter{
    public body: any
    public code: any

    RespondOk (response: any): void {
      this.body = response
      this.code = 200
    }
  
    RespondInternalServerError (exception: Error): void {
      this.body = exception
      this.code = 400
    }
}