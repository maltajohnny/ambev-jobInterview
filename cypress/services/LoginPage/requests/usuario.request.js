function createUsuarioRequestOptions(apiBaseUrl, body) {
  return {
    method: 'POST',
    url: `${apiBaseUrl}/usuarios`,
    body,
    failOnStatusCode: false,
  };
}

module.exports = { createUsuarioRequestOptions };
