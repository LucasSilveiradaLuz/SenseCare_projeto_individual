const express = require("express"); // Framework para criar servidor e rotas
const mysql = require("mysql2"); // Biblioteca para conectar no MySQL
const path = require("path"); // Módulo nativo do Node para lidar com caminhos

const app = express(); // Cria a aplicação Express

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (HTML, CSS, JS da pasta public/)
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco MySQL (via XAMPP)
const db = mysql.createConnection({
  host: "localhost", // Servidor do MySQL
  user: "root", // Usuário padrão do XAMPP
  password: "", // Senha (geralmente vazia no XAMPP)
  database: "SenseCare", // Nome do banco que você criou
});

// ---------- ROTAS ----------

// app.get("/enfermeiros", (req, res) => {
//   db.query("SELECT * FROM enfermeiro", (err, results) => {
//     if (err) throw err; // Se der erro na query, interrompe
//     res.json(results); // Envia o resultado como JSON para o front
//   });
// });
app.get("/Pacientes", (req, res) => {
  db.query("SELECT * FROM Pacientes", (err, results) => {
    if (err) throw err; // Se der erro na query, interrompe
    res.json(results); // Envia o resultado como JSON para o front
  });
});
// POST /usuarios → insere um novo usuário no banco
app.post("/Pacientes", (req, res) => {
  const { 
    CPF, 
    Nome, 
    DataDeNascimento, 
    Endereço, 
    Telefone, 
    mãe, 
    Procedimento, 
    Historico, 
    Medicacoes, 
    Genero, 
    Alergias, 
    Prioridade
  } = req.body; 

  db.query(
    "INSERT INTO Pacientes ( CPF_Paciente, Nome, dataNascimento, endereco, telefone, nomeMae, procedimento, HistoricoDoencas, Medicacoes, Genero, Alergias, Prioridade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [ 
      CPF, 
      Nome, 
      DataDeNascimento, 
      Endereço, 
      Telefone, 
      mãe, 
      Procedimento, 
      Historico, 
      Medicacoes, 
      Genero, 
      Alergias, 
      Prioridade
    ],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar paciente:", err);
        return res.status(500).json({ message: "Erro ao adicionar paciente." });
      }
      res.json({ message: "Paciente adicionado com sucesso!" }); 
    }
  );
});
app.delete("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM funcionarios WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Funcionário removido com sucesso!" });
  });
});
// Inicia o servidor na porta 3000
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);