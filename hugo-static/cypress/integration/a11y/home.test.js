describe("A11y", () => {
  it("Home page is accessible", () => {
    cy.checkPageA11y("/");
  });
});
