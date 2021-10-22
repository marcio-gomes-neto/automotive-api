export interface IPresenter{
    body: any
    code: any
    RespondOk: (output: any) => void
    RespondInternalServerError: (exception: Error) => void
  }
  