import request from 'supertest'
import app from '../../../dist/App'

const updateUser:any = {}

    updateUser.email = 'novoemail@gmail.com',
    updateUser.phone = '9876543210',
    updateUser.address = "novo endereco"
    updateUser.city = "RJ"
    updateUser.gender = "feminino"

describe('Update User Route', () => {
    it('Should return fail with no arguments', async () => {
        const updateRequest = await request(app)
          .post('/api/user/update/60521143802')
          .send(undefined)
          expect(updateRequest.body).toBe("Argument Cant Be Null")
          expect(updateRequest.statusCode).toBe(400)
    })

    it('Should return fail with no cpf', async () => {
    const updateRequest = await request(app)
        .post('/api/user/update/123424')
        .send(updateUser)
        expect(updateRequest.body).toBe("Invalid CPF")
        expect(updateRequest.statusCode).toBe(400)
    })

    it('Should return fail with unknown key', async () => {
        updateUser.teste = "teste"
        const updateRequest = await request(app)
            .post('/api/user/update/60521143802')
            .send(updateUser)
            expect(updateRequest.body).toBe("Unknown key: teste")
            expect(updateRequest.statusCode).toBe(400)
        delete updateUser.teste
    })
    
    it('Should return fail with invalid key', async () => {
        updateUser.gender = 12
        const updateRequest = await request(app)
            .post('/api/user/update/60521143802')
            .send(updateUser)
            expect(updateRequest.body).toBe("Invalid gender")
            expect(updateRequest.statusCode).toBe(400)
        updateUser.gender = "feminino"
    })

    it('Should successfully update the user', async () => {
        const updateRequest = await request(app)
            .post('/api/user/update/60521143802')
            .send(updateUser)
            expect(updateRequest.body.message).toBe("User Updated!")
            expect(updateRequest.body.user.gender).toBe("feminino")
            expect(updateRequest.statusCode).toBe(200)
    })
 
})