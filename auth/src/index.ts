import mongoose from 'mongoose';

import app from './app';

const start = async () => {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET key is missing');

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('connected to mongodb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('auth server running at port 3000!!!');
    });
}

start();