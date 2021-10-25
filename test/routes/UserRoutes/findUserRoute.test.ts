import request from 'supertest'
import app from '../../../dist/App'

describe('Find User Route', () => {
    it('Should return all users', async () => {
        const findRequest = await request(app)
          .get('/api/user')
          expect(findRequest.body.users[0].length).toBeGreaterThan(5)
          expect(findRequest.statusCode).toBe(200)
      })

    it('Should find by id', async () => {
    const findRequest = await request(app)
        .get('/api/user/4')
        expect(findRequest.body.user.id).toBe(4)
        expect(findRequest.statusCode).toBe(200)
    })

    it('Should find by cpf', async () => {
        const findRequest = await request(app)
            .get('/api/user/cpf/15919774606')
            expect(findRequest.body.user.cpf).toBe("15919774606")
            expect(findRequest.statusCode).toBe(200)
    })
    
    it('Should find by name', async () => {
        const findRequest = await request(app)
            .get('/api/user?name=nometeste')
            expect(findRequest.body.users[0][0].name).toBe("nometeste")
            expect(findRequest.statusCode).toBe(200)
    })
      
    it('Should find by city', async () => {
        const findRequest = await request(app)
            .get('/api/user?city=BH')
            expect(findRequest.body.users[0][0].city).toBe("BH")
            expect(findRequest.statusCode).toBe(200)
    })

    it('Should find by gender', async () => {
        const findRequest = await request(app)
            .get('/api/user?gender=masculino')
            expect(findRequest.body.users[0][0].gender).toBe("masculino")
            expect(findRequest.statusCode).toBe(200)
    })

    it('Should not find by unknown query', async () => {
        const findRequest = await request(app)
        .get('/api/user?teste=teste')
        expect(findRequest.body.message).toBe("Cannot search with selected query")
        expect(findRequest.statusCode).toBe(200)
    })

})