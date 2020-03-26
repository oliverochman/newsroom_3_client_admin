describe("User authenticates", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login.json"
    });
    cy.visit("/");
  });
  it("successfully with valid credentials", () => {
    // cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("admin@times.ma");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Login")
        .click();
    });
      cy.get("#message").should("contain", "Hello admin@times.ma");
  });
});
describe("User authenticates", () => {
  before(() => {
    cy.server()
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/**",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      }
    });
    cy.visit("/");
  });

  it("unsuccessfully with invalid credentials", () => {
    // cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("admin@times.ma");
      cy.get("#password").type("wrongpassword");
      cy.get("button")
        .contains("Login")
        .click();
    });
    cy.get("#message").should("contain", "Invalid login credentials.");
  });
});
