import request from 'supertest'

import app from "../../app";

it('sigin with email that does not exists', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'testPass'
        })
        .expect(400);
});

it('sigin with invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testPass'
        })
        .expect(201);
        
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'testWrong'
        })
        .expect(400);
});

it('responds with cookie with signin with valid credentails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testPass'
        })
        .expect(201);
        
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'testPass'
        })
        .expect(200);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});