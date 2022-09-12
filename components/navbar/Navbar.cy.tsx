import Navbar from "./Navbar";

describe("<Navbar>", () => {
  it("mounts", () => {
    cy.mount(<Navbar />);
  });

  it("renders", () => {
    cy.mount(<Navbar />);
    cy.get('[aria-label="Navbar"]').should("exist");
  });

  it("has expected values", () => {
    cy.mount(<Navbar />);
    cy.get('[aria-label="Navbar"]').get('[aria-label="Logo"]').should("exist");
    cy.get('[aria-label="Navbar"]')
      .get('[aria-label="Search"]')
      .should("exist");
  });

  it("has all pages", () => {
    cy.mount(<Navbar />);
    const Links = cy
      .get('[aria-label="Navbar"]')
      .get('[aria-label="menu"]')
      .get("ul");
    Links.get("li").should("have.length", 5);

    const pages = ["Home", "Bronze", "Silver", "Gold", "Pro"];
    Links.get("li").each(($el, index) => {
      cy.wrap($el).should("have.text", pages[index]);
    });
  });
});
