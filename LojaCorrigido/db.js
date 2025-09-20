// db.js — Banco de dados simulado
const produtos = [
  // Bolos
  {
    id: 1,
    nome: "Bolo de Chocolate com Morangos",
    descricao: "morango recheio de brigadeiro e prestígio ",
    imagem: "./Imagens/Bolos/Bolo-chocolate-grande.jpeg",
    categoria: "Bolos"
  },
  {
    id: 2,
    nome: "Bolo de Chocolate Decorado",
    descricao: "recheio de brigadeiro ",
    imagem: "./Imagens/Imagens/Bolos/Bolo-chocolate-lado.jpeg",
    imagemExtra: "../LojaAtulizado/Imagens/Bolos/Boloco-chocolate-vertical.jpeg",
    categoria: "Bolos"
  },
  {
    id: 3,
    nome: "Bolo no Pote",
    descricao: "porção individual para aniversário e lembrancinha, recheios de brigadeiro branco ",
    imagem: "./Imagens/Bolos/Bolo-pote-quadrado.jpeg",
    categoria: "Bolos"
  },
  {
    id: 4,
    nome: "Bolo Rústico com Flores",
    descricao: "rústico com flores recheio de brigadeiro de maracujá ",
    imagem: "./Imagens/Bolos/Bolo-pote-redondo.jpeg",
    categoria: "Bolos"
  },
  {
    id: 5,
    nome: "Bolo de Aniversário",
    descricao: "Personalizado com tema infantil,  massa de chocolate recheio de brigadeiro de maracujá ",
    imagem: ".Imagens/Bolos/Bolo-Aniversario.jpeg",
    categoria: "Bolos"
  },

  // Brigadeiros Tradicionais
  {
    id: 6,
    nome: "Brigadeiro",
    preco: "R$140",
    categoria: "Brigadeiros Tradicionais",
    imagem: "./Imagens/Bolos/Caixa-brigadeiro-redondo.jpeg"
  },
  { id: 7, nome: "Coco", preco: "R$130", categoria: "Brigadeiros Tradicionais", imagem: "" },
  { id: 8, nome: "Ninho", preco: "R$135", categoria: "Brigadeiros Tradicionais", imagem: "" },
  { id: 9, nome: "Coco Queimado", preco: "R$145", categoria: "Brigadeiros Tradicionais", imagem: "" },
  { id: 10, nome: "Amendoim", preco: "R$140", categoria: "Brigadeiros Tradicionais", imagem: "" },

  // Brigadeiros Gourmet
  { id: 11, nome: "Brigadeiro Gourmet", preco: "R$160", categoria: "Brigadeiros Gourmet", imagem: "" },
  { id: 12, nome: "Café", preco: "R$160", categoria: "Brigadeiros Gourmet", imagem: "" },
  { id: 13, nome: "Ninho com Nutella", preco: "R$170", categoria: "Brigadeiros Gourmet", imagem: "" },
  { id: 14, nome: "Limão Siciliano", preco: "R$160", categoria: "Brigadeiros Gourmet", imagem: "" },
  { id: 15, nome: "Red Velvet", preco: "R$160", categoria: "Brigadeiros Gourmet", imagem: "" }
];

// Imagem padrão para brigadeiros sem foto
const IMAGEM_PADRAO = ".Imagens/Bolos/Caixa-brigadeiro.jpeg";

// Função para renderizar produtos filtrados
function renderizarProdutos(filtro = "Todos", busca = "") {
  const containerBolos = document.getElementById("container-bolos");
  const containerBrigadeiros = document.getElementById("brigadeiros-container");

  containerBolos.innerHTML = "";
  containerBrigadeiros.innerHTML = "";

  const produtosFiltrados = produtos.filter(p => {
    const matchCategoria = filtro === "Todos" || p.categoria === filtro;
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  // Renderizar bolos
  produtosFiltrados.filter(p => p.categoria === "Bolos").forEach(produto => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card h-100 text-center";

    // Imagens
    if (produto.imagemExtra) {
      const divImg = document.createElement("div");
      divImg.className = "bolo-multiview";

      const img1 = document.createElement("img");
      img1.src = produto.imagem;
      img1.alt = produto.nome;
      img1.className = "card-img-top img-fluid rounded";

      const img2 = document.createElement("img");
      img2.src = produto.imagemExtra;
      img2.alt = produto.nome;
      img2.className = "card-img-top img-fluid rounded";

      divImg.appendChild(img1);
      divImg.appendChild(img2);
      card.appendChild(divImg);
    } else {
      const img = document.createElement("img");
      img.src = produto.imagem;
      img.alt = produto.nome;
      img.className = "card-img-top img-fluid rounded";
      card.appendChild(img);
    }

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "card-title";
    titulo.textContent = produto.nome;

    const descricao = document.createElement("p");
    descricao.className = "brigadeiro__lista";
    descricao.textContent = produto.descricao ?? "";

    cardBody.appendChild(titulo);
    cardBody.appendChild(descricao);
    card.appendChild(cardBody);

    col.appendChild(card);
    containerBolos.appendChild(col);
  });

  renderBrigadeiros("Brigadeiros Tradicionais", produtosFiltrados, containerBrigadeiros);
  renderBrigadeiros("Brigadeiros Gourmet", produtosFiltrados, containerBrigadeiros);
}

// Função genérica para brigadeiros
function renderBrigadeiros(categoria, produtosFiltrados, container) {
  const produtosCat = produtosFiltrados.filter(p => p.categoria === categoria);
  if (produtosCat.length === 0) return;

  const secao = document.createElement("div");
  secao.className = categoria === "Brigadeiros Tradicionais" ? "brigadeiro__trad mb-5" : "brigadeiro__gourmet mb-5";

  const tituloSecao = document.createElement("h2");
  tituloSecao.textContent = categoria.replace("Brigadeiros", "").trim();
  secao.appendChild(tituloSecao);

  const row = document.createElement("div");
  row.className = "row g-4";

  produtosCat.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-3";

    const card = document.createElement("div");
    card.className = "card h-100 text-center";

    // Imagem (usa padrão se estiver vazia)
    const img = document.createElement("img");
    img.src = p.imagem || IMAGEM_PADRAO;
    img.alt = p.nome;
    img.className = "card-img-top img-fluid rounded brigadeiro-img";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const titulo = document.createElement("h5");
    titulo.className = "card-title";
    titulo.textContent = p.nome;

    const preco = document.createElement("p");
    preco.className = "card-text";
    preco.textContent = p.preco;

    cardBody.appendChild(titulo);
    cardBody.appendChild(preco);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });

  secao.appendChild(row);
  container.appendChild(secao);
}

// Inicialização
renderizarProdutos();

// Event listeners para filtro e busca
document.getElementById("filtro-categoria").addEventListener("change", e => {
  renderizarProdutos(e.target.value, document.getElementById("busca-produto").value);
});

document.getElementById("busca-produto").addEventListener("input", e => {
  renderizarProdutos(document.getElementById("filtro-categoria").value, e.target.value);
});
