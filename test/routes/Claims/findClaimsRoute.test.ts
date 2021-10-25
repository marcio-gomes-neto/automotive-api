import request from 'supertest'
import app from '../../../dist/App'

describe('Find Claims Route', () => {
    it('Should return all claims', async () => {
        const findRequest = await request(app)
          .get('/api/claims')
          expect(findRequest.body.claims[0].length).toBeGreaterThan(1)
          expect(findRequest.statusCode).toBe(200)
      })

    it('Should find claims by id', async () => {
    const findRequest = await request(app)
        .get('/api/claims/6')
        expect(findRequest.body.claim.id).toBe(6)
        expect(findRequest.statusCode).toBe(200)
    })

    it('Should find claims by type', async () => {
        const findRequest = await request(app)
            .get('/api/claims?type=colisao')
            expect(findRequest.body.claims[0].type).toBe("colisao")
            expect(findRequest.statusCode).toBe(200)
    })

    it('Should find claims by vehicle', async () => {
        const findRequest = await request(app)
            .get('/api/claims?vehicle=motoca')
            expect(findRequest.body.claims[0].vehicle).toBe("motoca")
            expect(findRequest.statusCode).toBe(200)    
    })

    it('Should find user claims', async () => {
        const findRequest = await request(app)
            .get('/api/user/85125442879/claims')
            expect(findRequest.body.message).toBe("User has 3 claim(s)!")
            expect(findRequest.statusCode).toBe(200)    
    })

    it('Should find outsource claims', async () => {
        const findRequest = await request(app)
            .get('/api/outsource/49582135034/claims')
            expect(findRequest.body.message).toBe("Outsource has 2 claim(s)!")
            expect(findRequest.statusCode).toBe(200)    
    })
})