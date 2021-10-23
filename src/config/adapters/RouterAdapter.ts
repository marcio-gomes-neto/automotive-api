import { Request, Response } from 'express'
import { IController } from '../interfaces/IController'
import { IRequest } from '../interfaces/IRequest'

export const routerAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const request:IRequest = {}
    if(req.params) request.params = req.params
    if(req.query) request.query = req.query
    if(req.body) request.body = req.body

    const response = await controller.Handle(request)
    
    res.status(response.code).json(response.body)

  }
}
