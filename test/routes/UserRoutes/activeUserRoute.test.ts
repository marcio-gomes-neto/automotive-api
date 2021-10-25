import request from 'supertest'
import app from '../../../dist/App'

describe('Disable and Enable User Route', () => {
    
    it('Should return all ACTIVE users', async () => {
        const findRequest = await request(app)
          .get('/api/user')
        
        findRequest.body.users[0].forEach(element => {
            expect(element.active).toBe(true)
        });
        expect(findRequest.statusCode).toBe(200)
    })

    it('Should disable a user', async () => {
        const updateRequest = await request(app)
            .post('/api/user/disable/60521143802')
            expect(updateRequest.body.message).toBe("User Disabled!")
            expect(updateRequest.body.user.active).toBe(false)
            expect(updateRequest.statusCode).toBe(200)
    })

    it('Should enable a user', async () => {
        const updateRequest = await request(app)
            .post('/api/user/enable/60521143802')
            expect(updateRequest.body.message).toBe("User Enabled!")
            expect(updateRequest.body.user.active).toBe(true)
            expect(updateRequest.statusCode).toBe(200)
    })
 
})