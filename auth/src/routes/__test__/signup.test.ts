import request from 'supertest';

import app from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testPass'
        })
        .expect(201);
});

it('returns a 400 on post request with invalid email', async () => {
    // await or return
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'td',
            password: 'tada'
        })
        .expect(400);
});

it('returns a 400 on post request with invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'n'
        })
        .expect(400);
});

it('returns a 400 on post request with missing email or password', async () => {
    // can't use return in case of multiple request
    await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com' })
        .expect(400);
    
    await request(app)
        .post('/api/users/signup')
        .send({ password: 'asdf' })
        .expect(400);
});

it('Do not allow sigup with duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testPass'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testPass'
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testPass'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});