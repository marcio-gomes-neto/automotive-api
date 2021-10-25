import request from 'supertest'
import app from '../../../dist/App'
import { cpf } from 'cpf-cnpj-validator'

const noOutsourceClaim:any = {
    desc:"Colisao de frente com uma motoca",
    type:"colisao",
    vehicle: "motoca"
}

const withOutsourceClaim:any = {
    claim: {
        desc:"colisao de traseira com uma camionete",
        type:"colisao",
        vehicle: "camionete"
    },
    outsource:{
        name: "outSourceTestName",
        cpf: cpf.generate().toString(),
        cnh: Math.random().toString(18).substring(0, 10),
        email:"teste@email.com",
        phone:"123456789"
    }
}
describe('Add New Claim route', () => {
    it('Should create a new claim without outsource', async () => {
        const userRequestBeforeClaim = await request(app)
            .get('/api/user/cpf/77568041395')
        const userClaims = userRequestBeforeClaim.body.user.claims

        const addRequest = await request(app)
          .post('/api/user/77568041395/newclaim/')
          .send(noOutsourceClaim)

          expect(addRequest.body.message).toBe("Claim Created With Sucess!")
          expect(addRequest.statusCode).toBe(201)
        const userRequestAfterClaims = await request(app)
            .get('/api/user/cpf/77568041395')
        
          expect(userRequestAfterClaims.body.user.claims).toBe(userClaims+1)
    })

    it('Should create a new claim with a new outsource', async () => {
        const userRequestBeforeClaim = await request(app)
            .get('/api/user/cpf/77568041395')
        const userClaims = userRequestBeforeClaim.body.user.claims
        
        const addRequest = await request(app)
          .post('/api/user/77568041395/newclaim/outsource')
          .send(withOutsourceClaim)

          expect(addRequest.body.message).toBe("Claim Created With Sucess!")
          expect(addRequest.body.claim.cpf_outsource).toBe(withOutsourceClaim.outsource.cpf)
          expect(addRequest.statusCode).toBe(201)
        const userRequestAfterClaims = await request(app)
            .get('/api/user/cpf/77568041395')
        
          expect(userRequestAfterClaims.body.user.claims).toBe(userClaims+1)
    })
})