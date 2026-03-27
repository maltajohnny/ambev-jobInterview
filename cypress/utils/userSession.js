const { buildUsuarioPayload } = require('../services/LoginPage/payload/usuario.payload');
const LoginPage = require('../support/pages/LoginPage');
const RegisterPage = require('../support/pages/RegisterPage');

/**
 * Credenciais do `cypress.env` (cypress.env.json / --env), com override opcional nos comandos.
 * @param {object} [overrides]
 * @param {string} [overrides.nome]
 * @param {string} [overrides.email]
 * @param {string} [overrides.password]
 */
function getCredentials(overrides = {}) {
  const nome = overrides.nome ?? Cypress.env('USER_NAME') ?? 'ambev-user';
  const email = overrides.email ?? Cypress.env('USER_EMAIL');
  const password = overrides.password ?? Cypress.env('USER_PASSWORD');

  if (!email || !password) {
    throw new Error(
      'Missing USER_EMAIL/USER_PASSWORD in Cypress environment (local env file or CI secrets).',
    );
  }

  return {
    nome,
    email,
    password,
  };
}

function getAdminCredentials(overrides = {}) {
  const nome =
    overrides.nome ?? Cypress.env('ADMIN_USER_NAME') ?? 'ambev-admin';
  const email = overrides.email ?? Cypress.env('ADMIN_USER_EMAIL');
  const password = overrides.password ?? Cypress.env('ADMIN_USER_PASSWORD');

  if (!email || !password) {
    throw new Error(
      'Missing ADMIN_USER_EMAIL/ADMIN_USER_PASSWORD in Cypress environment (local env file or CI secrets).',
    );
  }

  return {
    nome,
    email,
    password,
  };
}

/**
 * API: tenta login; se obtiver token, segue. Caso contrário cria usuário (sem privilégios de admin) e loga de novo.
 * Define Cypress.env('authToken') com o Bearer retornado.
 */
function ensureUserSessionForApi(overrides) {
  const apiUrl = Cypress.env('apiBaseUrl');
  const { nome, email, password } = getCredentials(overrides);

  cy.request({
    method: 'POST',
    url: `${apiUrl}/login`,
    body: { email, password },
    failOnStatusCode: false,
  }).then((loginResp) => {
    if (loginResp.status === 200 && loginResp.body.authorization) {
      Cypress.env('authToken', loginResp.body.authorization);
      return;
    }

    const usuarioBody = buildUsuarioPayload({
      nome,
      email,
      password,
      administrador: 'false',
    });

    cy.request({
      method: 'POST',
      url: `${apiUrl}/usuarios`,
      body: usuarioBody,
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: { email, password },
        failOnStatusCode: false,
      }).then((secondLogin) => {
        expect(
          secondLogin.status,
          'login após criar usuário ou com e-mail já existente na API',
        ).to.eq(200);
        expect(secondLogin.body.authorization).to.be.a('string');
        Cypress.env('authToken', secondLogin.body.authorization);
      });
    });
  });
}

/**
 * Replica o que o front grava no login (ServeRest).
 * Evita login na UI quando o usuário já existe — em testes repetidos o segundo
 * submit na tela costuma falhar (sessão/localStorage) e a home carrega sem navbar/produtos.
 */
function applyServeRestSession(win, { token, email, password }) {
  win.localStorage.setItem('serverest/userToken', token);
  win.localStorage.setItem('serverest/userEmail', email);
  win.localStorage.setItem('serverest/userPassword', password);
  win.localStorage.setItem('products', '[]');
}

function ensureAdminSessionForApi(overrides) {
  const apiUrl = Cypress.env('apiBaseUrl');
  const { nome, email, password } = getAdminCredentials(overrides);

  cy.request({
    method: 'POST',
    url: `${apiUrl}/login`,
    body: { email, password },
    failOnStatusCode: false,
  }).then((loginResp) => {
    if (loginResp.status === 200 && loginResp.body.authorization) {
      Cypress.env('adminAuthToken', loginResp.body.authorization);
      return;
    }

    const adminBody = buildUsuarioPayload({
      nome,
      email,
      password,
      administrador: 'true',
    });

    cy.request({
      method: 'POST',
      url: `${apiUrl}/usuarios`,
      body: adminBody,
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: { email, password },
        failOnStatusCode: false,
      }).then((secondLogin) => {
        expect(secondLogin.status).to.eq(200);
        expect(secondLogin.body.authorization).to.be.a('string');
        Cypress.env('adminAuthToken', secondLogin.body.authorization);
      });
    });
  });
}

/**
 * E2E: POST /login na API com email/senha do env (ou override).
 * Se retornar token → injeta sessão no localStorage e abre /home (sem depender do segundo login na UI).
 * Senão → cadastro web + login na UI (primeiro acesso).
 */
function ensureUserSessionForE2E(overrides) {
  const apiUrl = Cypress.env('apiBaseUrl');
  const baseUrl =
    Cypress.config('baseUrl') || 'https://front.serverest.dev';
  const { nome, email, password } = getCredentials(overrides);

  cy.request({
    method: 'POST',
    url: `${apiUrl}/login`,
    body: { email, password },
    failOnStatusCode: false,
  }).then((loginResp) => {
    const userExists =
      loginResp.status === 200 && Boolean(loginResp.body.authorization);

    if (userExists) {
      const token = loginResp.body.authorization;
      cy.visit(`${baseUrl}/home`, {
        onBeforeLoad(win) {
          applyServeRestSession(win, { token, email, password });
        },
      });
      return;
    }

    cy.visit(`${baseUrl}/login`);
    cy.clearLocalStorage();

    RegisterPage.visit();
    RegisterPage.register({ nome, email, password, asAdmin: false });
    cy.contains('Cadastro realizado com sucesso', { timeout: 15000 }).should(
      'be.visible',
    );
    LoginPage.visit();
    LoginPage.login(email, password);
  });
}

function ensureAdminSessionForE2E(overrides) {
  const apiUrl = Cypress.env('apiBaseUrl');
  const baseUrl =
    Cypress.config('baseUrl') || 'https://front.serverest.dev';
  const { nome, email, password } = getAdminCredentials(overrides);

  cy.request({
    method: 'POST',
    url: `${apiUrl}/login`,
    body: { email, password },
    failOnStatusCode: false,
  }).then((loginResp) => {
    const adminExists =
      loginResp.status === 200 && Boolean(loginResp.body.authorization);

    if (adminExists) {
      cy.visit(`${baseUrl}/admin/home`, {
        onBeforeLoad(win) {
          applyServeRestSession(win, {
            token: loginResp.body.authorization,
            email,
            password,
          });
          win.localStorage.setItem('serverest/userNome', nome);
        },
      });
      return;
    }

    const adminBody = buildUsuarioPayload({
      nome,
      email,
      password,
      administrador: 'true',
    });

    cy.request({
      method: 'POST',
      url: `${apiUrl}/usuarios`,
      body: adminBody,
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: { email, password },
        failOnStatusCode: false,
      }).then((adminLogin) => {
        expect(adminLogin.status).to.eq(200);
        cy.visit(`${baseUrl}/admin/home`, {
          onBeforeLoad(win) {
            applyServeRestSession(win, {
              token: adminLogin.body.authorization,
              email,
              password,
            });
            win.localStorage.setItem('serverest/userNome', nome);
          },
        });
      });
    });
  });
}

module.exports = {
  getCredentials,
  getAdminCredentials,
  ensureUserSessionForApi,
  ensureAdminSessionForApi,
  ensureUserSessionForE2E,
  ensureAdminSessionForE2E,
};
