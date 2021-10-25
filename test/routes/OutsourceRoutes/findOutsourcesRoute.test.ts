import request from 'supertest'
import app from '../../../dist/App'

describe('Find Outsources Route', () => {
    
    it('Should return all outsources', async () => {
        const findRequest = await request(app)
          .get('/api/outsource')
  
        expect(findRequest.body.outsource[0].length).toBeGreaterThanOrEqual(1)
        expect(findRequest.statusCode).toBe(200)
    
    })

    it('Should find by name', async () => {
        const findRequest = await request(app)
          .get('/api/outsource?name=Joao')
  
        expect(findRequest.body.outsource[0][0].name).toBe("Joao")
        expect(findRequest.statusCode).toBe(200)
    
    })

    it('Should find by cpf', async () => {
        const findRequest = await request(app)
          .get('/api/outsource/cpf/49228136677')
  
        expect(findRequest.body.outsource.cpf).toBe("49228136677")
        expect(findRequest.statusCode).toBe(200)
    
    })

    it('Should find by id', async () => {
        const findRequest = await request(app)
          .get('/api/outsource/2')
  
        expect(findRequest.body.outsource.id).toBe(2)
        expect(findRequest.statusCode).toBe(200)
    
    })
 
})