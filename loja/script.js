$(document).ready(function () {
  let produtosOriginais = [];
  let ordenacaoCrescente = true; // Controla a direção da ordenação

  $.getJSON('https://fakestoreapi.com/products', function (data) {
    produtosOriginais = data;

    $('#total-produtos').append(data.length);
    renderizarProdutos(data);
  });

  function renderizarProdutos(produtos) {
    const listaCards = $('#lista-produtos');
    listaCards.empty();

    produtos.forEach(produto => {
      const item = `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${produto.image}" class="card-img-top" alt="${produto.title}">
            <div class="card-body">
              <h5 class="card-title">${produto.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Preço:</strong> $${produto.price}</li>
            </ul>
          </div>
        </div>
      `;
      listaCards.append(item);
    });
  }

  $('#filtro-nome').on('input', function () {
    const valorInput = $(this).val().toLowerCase();

    const filtrados = produtosOriginais.filter(produto =>
      produto.title.toLowerCase().includes(valorInput)
    );

    renderizarProdutos(filtrados);
  });

  $('#ordenar-preco').on('click', function () {
    ordenacaoCrescente = !ordenacaoCrescente;

    const produtosOrdenados = [...produtosOriginais].sort((a, b) => {
      return ordenacaoCrescente ? a.price - b.price : b.price - a.price;
    });

    
    $(this).text(`Ordenar por Preço ${ordenacaoCrescente ? '↑' : '↓'}`);

    renderizarProdutos(produtosOrdenados);
  });
});