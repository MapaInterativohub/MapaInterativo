// routes/admin.js
const express = require("express");
const router = express.Router();
const path = require("path");
const pool = require("../db"); // importa a conexão com o PostgreSQL

// Rota: formulário para adicionar locais
router.get("/addlocais", (req, res) => {
  res.render("formulario_add_locais", {
    layout: "main_admin",
    css: ["style-form.css"],
    js: ["script-formulario.js", "script-map.js", "script-busca-de-locais.js"],
  });
});

// Rota: tela de gerenciamento de locais
router.get("/gerenciarlocais", (req, res) => {
  res.render("gerencia_locais", {
    layout: "main_admin",
    css: ["style-card.css"],
    js: ["sripts-locais-salvos.js"],
  });
});

/* ==============================
   ROTAS DE DADOS DO MAPA (BANCO)
   ============================== */

// GET /admin/pontos → Retorna todos os locais do banco
router.get("/pontos", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT 
        id_local AS id,
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
        nomeCidade AS cidade,
        estado,
        bairro,
        rua,
        cep
      FROM Local
    `);

    res.json(resultado.rows); // envia os dados para o mapa
  } catch (err) {
    console.error("Erro ao consultar o banco:", err);
    res.status(500).json({ erro: "Erro ao buscar dados no banco" });
  }
});

// GET /admin/pontos/:id → Retorna um local específico e renderiza popup do mapa
router.get("/pontos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { rows } = await pool.query(
      "SELECT * FROM Local WHERE id_local = $1",
      [id]
    );

    if (rows.length === 0)
      return res.status(404).send("Ponto não encontrado");

    const dado = rows[0];
    res.render("_html_mapa_popup_map", { layout: false, dado });
  } catch (err) {
    console.error("Erro ao buscar ponto:", err);
    res.status(500).send("Erro no banco de dados");
  }
});

// GET /admin/ponto/:id → Renderiza o card de favoritos
router.get("/ponto/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { rows } = await pool.query(
      "SELECT * FROM Local WHERE id_local = $1",
      [id]
    );

    if (rows.length === 0)
      return res.status(404).send("Ponto não encontrado");

    const dado = rows[0];
    res.render("_html_mapa_cardeFavoritos", { layout: false, dado });
  } catch (err) {
    console.error("Erro ao buscar ponto:", err);
    res.status(500).send("Erro no banco de dados");
  }
});

module.exports = router;
