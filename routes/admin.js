const express = require("express");
const router = express.Router();
const fs = require("fs");
const { console } = require("inspector");
const path = require("path");

const filePath = path.join(__dirname, "dados_locais.json");

router.get("/addlocais", (req, res) => {
  res.render("formulario_add_locais", {
    layout: "main_admin",
    css: ["style-form.css"],
    js: ["script-formulario.js", "script-map.js", "script-busca-de-locais.js"],
  });
});
router.get("/gerenciarlocais", (req, res) => {
  res.render("gerencia_locais", {
    layout: "main_admin",
    css: ["style-card.css"],
    js:["sripts-locais-salvos.js"]
  });
});

router.get("/pontos", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo JSON:", err);
      return res.status(500).json({ erro: "Erro ao ler o arquivo JSON" });
    }

    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (e) {
      console.error("Erro ao fazer parse do JSON:", e);
      res.status(500).json({ erro: "Erro ao fazer parse do JSON" });
    }
  });
});

router.get("/pontos/:id", (req, res) => {
    const id = parseInt(req.params.id);
  
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).send("Erro ao ler arquivo JSON");
    
        const pontos = JSON.parse(data);
        const dado = pontos.find((p) => p.id === id);
    
        if (!dado) return res.status(404).send("Ponto não encontrado");
    
        // Renderiza apenas o partial com layout false
        res.render("_popup_map copy", { layout: false, dado  });
      });
  });

module.exports = router;
