import express from 'express';

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('auth server running at port 3000!');
});