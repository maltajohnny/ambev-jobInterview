function listProdutosRequestOptions(apiBaseUrl) {
  return {
    method: 'GET',
    url: `${apiBaseUrl}/produtos`,
    failOnStatusCode: false,
  };
}

module.exports = { listProdutosRequestOptions };
