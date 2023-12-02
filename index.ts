import { PrismaClient } from '@prisma/client'

const bcrypt = require('bcrypt');

var express = require('express');

var app = express();

const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.listen(8080, '0.0.0.0');

const prisma = new PrismaClient()

app.get('/health', async (req: any, res: any) => {
    return res.status(200).send({ response: 'Server is runninsg!' });
});


app.post('/create_user', async (req: any, res: any) => {
    const { nome, email, senha } = req.body;

    const hasUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (hasUser) {
        return res.status(401).send({ error: 'This email is already registered.' });
    }

    const salt = await bcrypt.genSalt(12);
    const pswdHash = await bcrypt.hash(senha, salt);

    const user = await prisma.user.create({
        data: {
            nome,
            email,
            senha: pswdHash
        },
    })

    return res.json(user);
});

app.post('/authenticate_user', async (req: any, res: any) => {
    const { email, senha } = req.body;

    const hasUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!hasUser) {
        return res.status(403).send({ error: 'This email is not registered.' });
    }

    const pswdOkay = await bcrypt.compare(senha, hasUser.senha);

    if (!pswdOkay) {
        return res.status(403).send({ error: 'Invalid credentials.' });
    }

    return res.status(200).send({ msg: 'Okay!'});
});

app.post('/register_home', async (req: any, res: any) => {
    const { endereco, numero, cep, tamanho, quartos, banheiros, descricao } = req.body;
    console.log(endereco, numero, cep, tamanho, quartos, banheiros, descricao);
    return res.status(201).send({ response: 'Home registered!' });
});