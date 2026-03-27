function buildLoginPayload({ email, password }) {
  return { email, password };
}

module.exports = { buildLoginPayload };
