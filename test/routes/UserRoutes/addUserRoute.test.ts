import request from 'supertest'
import app from '../../../dist/App'
import { cpf } from 'cpf-cnpj-validator'

const userTest:any = {}

    userTest.cpf = cpf.generate().toString(),
    userTest.cnh = Math.random().toString(18).substring(0, 10),
    userTest.name = 'nometeste',
    userTest.email = 'teste@gmail.com',
    userTest.phone = '123456789',
    userTest.age = "19",
    userTest.address = "addressTest"
    userTest.city = "BH"
    userTest.gender = "masculino"

describe('Add User Route', () => {

    it('Should return success', async () => {
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body.message).toBe("User Created With Sucess!")
      expect(addRequest.statusCode).toBe(201)
  })

  it('Should return fail with already used CPF', async () => {
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("CPF already in use!")
      expect(addRequest.statusCode).toBe(400)
  })

  it('Should return fail with already used CNH', async () => {
    userTest.cpf = cpf.generate().toString()
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("CNH already in use!")
      expect(addRequest.statusCode).toBe(400)
  })
  
  it('Should return fail with user trying to send an ID', async () => {
    userTest.id = 50
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("No need to send ID")
      expect(addRequest.statusCode).toBe(400)
      delete userTest.id; 
  })

  it('Should return fail with no arguments', async () => {
    const addRequest = await request(app)
      .post('/api/user')
      .send(undefined)
      expect(addRequest.body).toBe("Argument Cant Be Null")
      expect(addRequest.statusCode).toBe(400)
  })

  it('Should return fail with unknown key', async () => {
    userTest.teste = "TesteTesteTeste"
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("Unknown key: teste")
      expect(addRequest.statusCode).toBe(400)
    delete userTest.teste; 
  })

  it('Should return fail with invalid name', async () => {
    userTest.name = 12
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("Invalid Name")
      expect(addRequest.statusCode).toBe(400)
    userTest.name = "nometeste"
  })
  it('Should return fail with invalid phone', async () => {
    userTest.phone = 12
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("Invalid phone")
      expect(addRequest.statusCode).toBe(400)
      userTest.phone = "123456789"
  })
  it('Should return fail with invalid age', async () => {
    userTest.age = 12
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("Invalid age")
      expect(addRequest.statusCode).toBe(400)
    userTest.age = "19"
  })
  it('Should return fail with invalid cnh', async () => {
    userTest.cnh = 12
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("Invalid CNH")
      expect(addRequest.statusCode).toBe(400)
    userTest.cnh = Math.random().toString(18).substring(0, 10)
  })
  it('Should return fail with because of data inconsistency', async () => {
    userTest.cnh = "1237894562"
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("This CNH belongs to a outsource registration!")
      expect(addRequest.statusCode).toBe(400)
  })
  
  it('Should return fail with because of data inconsistency', async () => {
    userTest.cpf = "49228136677"
    userTest.cnh = Math.random().toString(18).substring(0, 10)
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
      expect(addRequest.body).toBe("This CPF has another CNH registrated!")
      expect(addRequest.statusCode).toBe(400)
  })
  
  // THIS TEST MUST BE FIRST TRY !!!!!!!!!!!!!!!!
  it.skip('Should create a user that was a outsource', async () => {
    userTest.cpf = "96071073065"
    userTest.cnh = "9785643140"
    const addRequest = await request(app)
      .post('/api/user')
      .send(userTest)
    const findOutsourceRequest = await request(app)
      .get('/api/outsource/cpf/96071073065')

      expect(findOutsourceRequest.body.outsource.user).toBe(true)
      expect(addRequest.body.user.outsource).toBe(true)
      expect(addRequest.statusCode).toBe(201)
  })
})