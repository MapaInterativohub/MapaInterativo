// routes/form.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // importa a conexão com o PostgreSQL

// Middleware para interpretar JSON
router.use(express.json());

// Rota para adicionar um novo local
router.post("/addlocais", async (req, res) => {
  try {
    const {
      nome,
      descricao,
      telefone,
      email,
      imagem,
      latitude,
      longitude,
      numero,
      complemento,
      id_categoria,
      id_gestor,
      nomeCidade,
      estado,
      bairro,
      rua,
      cep
    } = req.body;

    // Verifica se campos obrigatórios foram preenchidos
    if (!nome || !latitude || !longitude || !id_categoria || !id_gestor) {
      return res.status(400).json({ erro: "Campos obrigatórios não preenchidos." });
    }

    // Insere o novo local no banco
    await pool.query(
      `
      INSERT INTO Local (
        nome,
        descricao,
        telefone,
        email,
        imagem,
        latitude,
        longitude,
        numero,
        complemento,
        id_categoria,
        id_gestor,
        nomeCidade,
        estado,
        bairro,
        rua,
        cep
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11,
        $12, $13, $14, $15, $16
      )
      `,
      [
        nome,
        descricao,
        telefone,
        email,
        imagem,
        latitude,
        longitude,
        numero,
        complemento,
        id_categoria,
        id_gestor,
        nomeCidade,
        estado,
        bairro,
        rua,
        cep
      ]
    );

    console.log("✅ Novo local inserido com sucesso!");
    res.status(200).json({ mensagem: "Dados salvos com sucesso no banco!" });
  } catch (err) {
    console.error("❌ Erro ao inserir local:", err);
    res.status(500).json({ erro: "Erro ao salvar os dados no banco de dados." });
  }
});

module.exports = router;
