const request = require('supertest'); // Importa o Supertest
const app = require('../../app'); // Importa nosso app Express configurado

// Descreve o conjunto de testes para a API
describe('API Health Check', () => {

    // O 'it' define um caso de teste específico
    it('Deve retornar status 200 e uma mensagem de "ok" na rota GET /api/health-check', async () => {
        // 'request(app)' usa o Supertest
        const response = await request(app)
            .get('/api/health-check')
            .expect(200); // Asserção 1: Espera que o status HTTP seja 200

        // Asserção 2: Espera que o corpo da resposta seja { status: 'ok' }
        expect(response.body).toEqual({ status: 'ok' });
    });

});