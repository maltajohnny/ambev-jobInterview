const HomePage = require('../../support/pages/HomePage');
const ListaComprasPage = require('../../support/pages/ListaComprasPage');
const {
  HOME_INPUTS,
  HOME_BUTTONS,
  HOME_PRODUCT,
  LISTA_COMPRAS_TEXT,
  LISTA_COMPRAS_BUTTONS,
} = require('../../support/pages/elements');

function parsePrecoRs(texto) {
  const apenasDigitos = String(texto).replace(/\D/g, '');
  return parseInt(apenasDigitos, 10);
}

describe('E2E — Lista de compras (/minhaListaDeProdutos)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('na Home, busca por nome e confere o produto na grade antes de ir à lista', () => {
    HomePage.visit();
    cy.get(HOME_PRODUCT.titulo_card)
      .first()
      .invoke('text')
      .then((nome) => {
        const termo = nome.trim();
        expect(termo.length).to.be.above(0);
        cy.get(HOME_INPUTS.pesquisar).clear();
        cy.get(HOME_INPUTS.pesquisar).type(termo);
        cy.get(HOME_BUTTONS.pesquisar).click();
        cy.get(HOME_PRODUCT.titulo_card).first().should('contain', termo);
      });
  });

  it('adiciona o primeiro produto à lista (incrementa itens no localStorage)', () => {
    HomePage.visit();
    cy.window().then((win) => {
      const antes = JSON.parse(win.localStorage.getItem('products') || '[]').length;
      cy.wrap(antes).as('wishlistAntes');
    });
    HomePage.addFirstProductToList();
    cy.window().then((win) => {
      const depois = JSON.parse(win.localStorage.getItem('products') || '[]')
        .length;
      cy.get('@wishlistAntes').then((antes) => {
        expect(depois).to.eq(antes + 1);
      });
    });
  });

  it('acessa a Lista de Compras pelo menu e pelo ícone ao lado do título', () => {
    HomePage.visit();
    HomePage.openShoppingListViaNav();
    cy.url().should('include', '/minhaListaDeProdutos');

    cy.get(LISTA_COMPRAS_BUTTONS.pagina_inicial).click();
    cy.url().should('include', '/home');

    HomePage.openShoppingListViaCartIcon();
    cy.url().should('include', '/minhaListaDeProdutos');
  });

  it('adiciona à lista, redireciona para /minhaListaDeProdutos; + e − alteram quantidade e o preço total', () => {
    HomePage.visit();

    cy.get('section.row.espacamento .card')
      .first()
      .within(() => {
        cy.get('h5.card-title')
          .invoke('text')
          .then((nomeTexto) => {
            cy.get('h6.card-subtitle')
              .last()
              .invoke('text')
              .then((precoTxt) => {
                cy.wrap(nomeTexto.trim()).as('nomeProduto');
                cy.wrap(parsePrecoRs(precoTxt)).as('precoUnitario');
              });
          });
      });

    cy.get('@precoUnitario').then((precoUnitario) => {
      expect(precoUnitario).to.be.a('number').and.to.be.above(0);
    });

    cy.get(HOME_PRODUCT.adicionar_lista).first().click();
    cy.url({ timeout: 15000 }).should('include', '/minhaListaDeProdutos');

    cy.get('@nomeProduto').then((nomeProduto) => {
      cy.get(LISTA_COMPRAS_TEXT.nome_produto).should('contain', nomeProduto);
    });

    cy.get('@precoUnitario').then((precoUnitario) => {
      cy.get(LISTA_COMPRAS_TEXT.quantidade_resumo).should('contain', 'Total: 1');
      cy.get('section.row.espacamento .card')
        .first()
        .within(() => {
          cy.contains('p', 'Preço R$').should(($p) => {
            expect(parsePrecoRs($p.text())).to.eq(precoUnitario);
          });
        });

      cy.get(LISTA_COMPRAS_BUTTONS.aumentar).first().click();
      cy.get(LISTA_COMPRAS_TEXT.quantidade_resumo).should('contain', 'Total: 2');
      cy.get('section.row.espacamento .card')
        .first()
        .within(() => {
          cy.contains('p', 'Preço R$').should(($p) => {
            expect(parsePrecoRs($p.text())).to.eq(precoUnitario * 2);
          });
        });

      cy.get(LISTA_COMPRAS_BUTTONS.diminuir).first().click();
      cy.get(LISTA_COMPRAS_TEXT.quantidade_resumo).should('contain', 'Total: 1');
      cy.get('section.row.espacamento .card')
        .first()
        .within(() => {
          cy.contains('p', 'Preço R$').should(($p) => {
            expect(parsePrecoRs($p.text())).to.eq(precoUnitario);
          });
        });
    });
  });

  it('Página Inicial na lista retorna para /home', () => {
    ListaComprasPage.visit();
    ListaComprasPage.clickPaginaInicial();
    cy.url().should('include', '/home');
  });

  it('Limpar lista remove os itens adicionados', () => {
    HomePage.visit();
    cy.get(HOME_PRODUCT.adicionar_lista).first().click();
    cy.url().should('include', '/minhaListaDeProdutos');
    cy.get(LISTA_COMPRAS_TEXT.nome_produto).should('exist');

    ListaComprasPage.clickLimparLista();
    ListaComprasPage.expectListaVazia();
    cy.get(LISTA_COMPRAS_TEXT.nome_produto).should('not.exist');
  });
});
