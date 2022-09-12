import Header from "./Header";

describe("<Header>", () => {
  it("mounts", () => {
    cy.mount(<Header />);
  });

  it("renders", () => {
    cy.mount(<Header />);
    cy.get("head").should("exist");
  });
});
