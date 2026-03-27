function buildUsuarioPayload({ nome, email, password, administrador = 'false' }) {
  return {
    nome,
    email,
    password,
    administrador,
  };
}

module.exports = { buildUsuarioPayload };
