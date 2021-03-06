describe("journalist can creates article", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://newsroom3api.herokuapp.com/api/v1/articles",
      response: "fixture:article_success_message.json"
    });
    cy.visit("/");
    cy.window()
      .then(window => {
        window.store.dispatch(
          {
            type: "AUTHENTICATE",
            payload: { authenticated: true, userEmail: 'admin@times.ma' }
          }
        )
      })
  })


  it("authenticated user succefully creates first article", () => {
    cy.get("#new-article-form").within(() => {
      cy.get("#title-field").type("this is a title");
      cy.get("#snippet-field").type("this is a snippet");
      cy.get("#title-content").type("this is a content");
      cy.get("#category-menu").select("Tech");
      cy.get("#create-article").click();
    });
    cy.get("#response-message").should("contain", "Your article was saved");
  });
});

describe("journalist can not create emty article", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://newsroom3api.herokuapp.com/api/v1/articles",
      response: "fixture:article_error_message.json"
    });
    cy.visit("/");
    cy.window()
      .then(window => {
        window.store.dispatch(
          {
            type: "AUTHENTICATE",
            payload: { authenticated: true, userEmail: 'admin@times.ma' }
          }
        )
      })
  });

  it("can not create article without title", () => {
    cy.get("#new-article-form").within(() => {
      cy.get("#snippet-field").type("this is a snippet");
      cy.get("#title-content").type("this is a content");
      cy.get("#category-menu").select("Tech");
      cy.get("#create-article").click();
    });
    cy.get("#response-message").should("contain", "Title can't be blank");
  });
});
