// Função para criar conteúdo do popup
function criarCard(dado) {
  return `
    <div class="salvos" id:${dado.id}>
        <a href="#">
            <div class="card">
                <div class="endereco-card">
                    <h1 id="txt_card_instituicao">${dado.nome}</h1>
                    <p id="txt_card_endereco">Endereço: ${dado.rua}, ${dado.numero} - ${dado.bairro}, ${dado.cidade}</p>
                    <p id="txt_card_tipo_de_servico">${dado.categoria}</p>
                </div>
            </div>
        </a>
        <div class="btn_card">
            <button class="status">Ativo</button>
            <button class="Editar">Editar:</button>
        </div>
    </div>
`;
}


function locaisSalvos() {
  fetch("http://localhost:3000/admin/pontos")
    .then((res) => res.json())
    .then((dados) => {
      let container = document.getElementById("cards");
      container.innerHTML = "";

      dados.forEach((ponto) => {
        container.insertAdjacentHTML("beforeend", criarCard(ponto));
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os pontos:", error);
    });
}

locaisSalvos();

