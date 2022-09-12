import LeagueSearchCard from "./LeagueSearchCard";

describe("<LeagueSearchCard>", () => {
  it("mounts", () => {
    cy.mount(<LeagueSearchCard name="test" />);
  });

  it("renders", () => {
    cy.mount(<LeagueSearchCard name="test" />);
    cy.get('[aria-label="LeagueSearchCard"]').should("exist");
  });

  it("has expected number of children", () => {
    cy.mount(<LeagueSearchCard name="test" />);
    cy.get('[aria-label="LeagueSearchCard"]')
      .children()
      .should("have.length", 3);
  });

  it("has expected text when no data is passed", () => {
    cy.mount(<LeagueSearchCard name="test" />);
    cy.get('[aria-label="LeagueSearchCard"]').contains(
      "div",
      "No results found."
    );
  });

  it("has expected text when no data is answered by the api", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/league/search/test/0",
      },
      {
        body: [],
      }
    ).as("search");
    cy.mount(<LeagueSearchCard name="test" />);
    cy.wait("@search");
    cy.get('[aria-label="LeagueSearchCard"]').contains("div", "test");
    cy.get('[aria-label="LeagueSearchCard"]').contains(
      "div",
      "No results found."
    );
  });

  it("has expected text when the api answers with at least one result", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/league/search/test/0",
      },
      {
        body: [
          {
            id: 1,
            name: "test",
            skill: 100,
            lrank: 1,
            ratio: 1.0,
            kills: 10,
            deaths: 10,
            prestige: 0,
          },
        ],
      }
    ).as("search");
    cy.mount(<LeagueSearchCard name="test" />);
    cy.wait("@search");
    cy.get("table").should("exist");
    cy.get("tbody").children().should("have.length", 1);
  });
});
