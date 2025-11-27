const tarefaController = require('../controllers/tarefaController');
const Tarefa = require('../models/tarefaModel');

jest.mock('../models/tarefaModel');

describe('TarefaController — Testes Unitários', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getAllTarefas — deve retornar todas as tarefas com status 200', async () => {
        const mockTarefas = [
            { id: 1, titulo: "Mock 1" },
            { id: 2, titulo: "Mock 2" }
        ];

        Tarefa.findAll.mockResolvedValue(mockTarefas);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await tarefaController.getAllTarefas(req, res);

        expect(Tarefa.findAll).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTarefas);
    });

    it('createTarefa — deve criar tarefa e retornar 201', async () => {
        const dados = { titulo: "Nova tarefa", descricao: "Teste" };
        const criada = { id: 10, ...dados };

        Tarefa.create.mockResolvedValue(criada);
        
        const req = {
            body: dados,
            usuario: { id: 1 }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await tarefaController.createTarefa(req, res);

        expect(Tarefa.create).toHaveBeenCalledWith({
    ...dados,
    concluida: false,
    usuarioId: req.usuario.id
});

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(criada);
    });

});
