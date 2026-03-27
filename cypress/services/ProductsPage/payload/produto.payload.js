function buildProdutoPayload({
  nome,
  preco,
  descricao,
  quantidade,
}) {
  return {
    nome,
    preco,
    descricao,
    quantidade,
  };
}

module.exports = { buildProdutoPayload };
