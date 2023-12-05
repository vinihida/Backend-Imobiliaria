import express, { Request, Response } from 'express';
import { PrismaClient, User, Home } from '@prisma/client';
import bcrypt from 'bcrypt';
import cors from 'cors';

const { scrapp } = require('./scrapp/scrapp.ts')
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(8080, '0.0.0.0', () => {
    console.log('Server is running on port 8080');
});

app.get('/health', async (req: Request, res: Response) => {
    return res.status(200).send({ response: 'Server is running!' });
});

app.post('/create_user', async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body as { nome: string; email: string; senha: string };

    const hasUser: User | null = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

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
        }
    });

    return res.json(user);
});

app.post('/authenticate_user', async (req: Request, res: Response) => {
    const { email, senha } = req.body as { email: string; senha: string };

    const hasUser: User | null = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!hasUser) {
        return res.status(403).send({ error: 'This email is not registered.' });
    }

    const pswdOkay = await bcrypt.compare(senha, hasUser.senha);

    if (!pswdOkay) {
        return res.status(403).send({ error: 'Invalid credentials.' });
    }

    return res.status(200).send({ msg: 'Okay!' });
});

app.post('/register_home', async (req: Request, res: Response) => {
    const { endereco, numero, cep, tamanho, quartos, banheiros, descricao } = req.body as {
        endereco: string;
        numero: number;
        cep: string;
        tamanho: number;
        quartos: number;
        banheiros: number;
        descricao: string;
    };

    const home = await prisma.home.create({
        data: {
            endereco,
            numero,
            cep,
            tamanho,
            quartos,
            banheiros,
            descricao,
        }
    });

    return res.json(home);
});

app.get('/scrapp', async (req: Request, res: Response) => {
    const homeMock = scrapp();
    return res.json(homeMock);
});
