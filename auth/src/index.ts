import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/healthcheck', (req: express.Request, res: express.Response) => {
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('auth server running at port 3000!');
});