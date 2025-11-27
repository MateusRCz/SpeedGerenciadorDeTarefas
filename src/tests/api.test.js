// mock dos models
jest.mock('../models/tarefaModel', () => ({
    findAll: jest.fn(),
    create: jest.fn(),
}));

jest.mock('../models/usuarioModel', () => ({
    findAll: jest.fn(),
}));

// mock do middleware
jest.mock('../middlewares/authMiddleware', () => ({
    verificaToken: (req, res, next) => {
        return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
    }
}));

const request = require('supertest');
const app = require('../../app');

const Tarefa = require('../models/tarefaModel');
const Usuario = require('../models/usuarioModel');

describe('API — Testes de Integração com Mock', () => {

    afterEach(() => jest.clearAllMocks());

    it('GET /api/tarefas — deve retornar tarefas', async () => {

        // mockando método de model
        const mock = [{ id: 1, titulo: "Tarefa Teste" }];
        Tarefa.findAll.mockResolvedValue(mock);

        const resp = await request(app)
            .get('/api/tarefas')
            .expect(200);

        expect(resp.body).toEqual(mock);
    });

    it('POST /api/tarefas — sem token deve retornar 401', async () => {

        const resp = await request(app)
            .post('/api/tarefas')
            .send({ titulo: "Teste" });

        expect(resp.status).toBe(401);
    });

    it('GET /api/usuarios — deve retornar usuários', async () => {

        const mock = [{ id: 1, nome: "Teste" }];
        Usuario.findAll.mockResolvedValue(mock);

        const resp = await request(app)
            .get('/api/usuarios')
            .expect(200);

        expect(resp.body).toEqual(mock);
    });

});
