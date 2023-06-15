import request from 'supertest';

import app from '../../app';

it('get user details', async () => {
    const responseWithCookie = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testPass'
        })
        .expect(201);
        
    const cookie = responseWithCookie.get('Set-Cookie');

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});