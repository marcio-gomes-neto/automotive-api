export interface IController {
  Handle: (request: any) => Promise<any>
}
