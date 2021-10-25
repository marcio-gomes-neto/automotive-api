export interface IPresenter{
    body: any
    code: any
    RespondOk: (response: any, code:number) => void
    RespondInternalServerError: (exception: Error, code: number) => void
  }
  