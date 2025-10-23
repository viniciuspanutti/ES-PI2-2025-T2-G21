// Tom

const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;


app.use(cors()); // Habilita o CORS para a comunicação entre front-end e back-end
app.use(express.json()); // Habilita o "body-parser" do Express para ler JSON

app.use(express.static(path.join(__dirname, '..')));

// --- Conexão com o Banco de Dados ---
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bluelock@1966', 
    database: 'users'            
});

// --- Rota da API para o Cadastro ---
app.post('/cadastrar', (req, res) => {
    console.log('Recebido no /cadastrar:', req.body); // Para depuração
    const { nome, email, telefone, senha } = req.body;


    const sql = "INSERT INTO cadastro (nome, email, telefone, senha) VALUES (?, ?, ?, ?)";
    
    connection.query(sql, [nome, email, telefone, senha], (error, results) => {
        if (error) {
            console.error("Erro ao cadastrar:", error);
            return res.status(500).json({ message: 'Falha ao cadastrar. O email pode já estar em uso.' });
        }
        console.log("Usuário cadastrado com sucesso!");
        return res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});