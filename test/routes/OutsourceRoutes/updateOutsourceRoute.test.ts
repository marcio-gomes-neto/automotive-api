import request from 'supertest'
import app from '../../../dist/App'

const updateOutsource:any = {}

    updateOutsource.email = 'novoemail@gmail.com',
    updateOutsource.phone = '9876543210'

describe('Update User Route', () => {
    it('Should return fail with no arguments', async () => {
        const updateRequest = await request(app)
          .post('/api/outsource/update/60521143802')
          .send(undefined)
          expect(updateRequest.body).toBe("Argument Cant Be Null")
          expect(updateRequest.statusCode).toBe(400)
    })

    it('Should return fail with no cpf', async () => {
    const updateRequest = await request(app)
        .post('/api/outsource/update/123424')
        .send(updateOutsource)
        expect(updateRequest.body).toBe("Invalid CPF")
        expect(updateRequest.statusCode).toBe(400)
    })

    it('Should return fail with unknown key', async () => {
        updateOutsource.teste = "teste"
        const updateRequest = await request(app)
            .post('/api/outsource/update/49228136677')
            .send(updateOutsource)
            expect(updateRequest.body).toBe("Unknown key: teste")
            expect(updateRequest.statusCode).toBe(400)
        delete updateOutsource.teste
    })
    
    it('Should return fail with invalid key', async () => {
        updateOutsource.email = 12
        const updateRequest = await request(app)
            .post('/api/outsource/update/49228136677')
            .send(updateOutsource)
            expect(updateRequest.body).toBe("Invalid email")
            expect(updateRequest.statusCode).toBe(400)
            updateOutsource.email = "novoemail@gmail.com"
    })

    it('Should successfully update the user', async () => {
        const updateRequest = await request(app)
            .post('/api/outsource/update/49228136677')
            .send(updateOutsource)
            expect(updateRequest.body.message).toBe("Outsource Updated!")
            expect(updateRequest.body.outsource.email).toBe("novoemail@gmail.com")
            expect(updateRequest.statusCode).toBe(200)
    })
 
})