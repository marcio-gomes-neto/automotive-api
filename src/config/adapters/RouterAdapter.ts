import { Request, Response } from 'express'
import { IController } from '../interfaces/IController'

export const routerAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const request = req.body

    const response = await controller.Handle(request)
    
    res.status(response.code).json(response.body)

  }
}
