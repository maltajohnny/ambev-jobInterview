function loginRequestOptions(apiBaseUrl, body) {
  return {
    method: 'POST',
    url: `${apiBaseUrl}/login`,
    body,
    failOnStatusCode: false,
  };
}

module.exports = { loginRequestOptions };
