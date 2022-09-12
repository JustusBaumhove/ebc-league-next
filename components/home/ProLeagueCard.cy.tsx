import ProLeagueCard from "./ProLeagueCard";

describe("<ProLeagueCard>", () => {
  it("mounts", () => {
    cy.mount(<ProLeagueCard />);
  });

  it("renders", () => {
    cy.mount(<ProLeagueCard />);
    cy.get('[aria-label="ProLeagueCard"]').should("exist");
  });

  it("has expected number of children", () => {
    cy.mount(<ProLeagueCard />);
    cy.get('[aria-label="ProLeagueCard"]').children().should("have.length", 2);
  });

  it("has expected text when no data is passed", () => {
    cy.mount(<ProLeagueCard />);
    cy.get('[aria-label="ProLeagueCard"]').contains(
      "div",
      "No data available."
    );
  });

  it("has expected text when no data is answered by the api", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/league/pro/0",
      },
      {
        body: [],
      }
    ).as("pro");
    cy.mount(<ProLeagueCard />);
    cy.wait("@pro");
    cy.get('[aria-label="ProLeagueCard"]').contains(
      "div",
      "No data available."
    );
  });

  it("has expected text when the api answers with at least one result", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/league/pro/0",
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
          {
            id: 2,
            name: "test2",
            skill: 200,
            lrank: 2,
            ratio: 2.0,
            kills: 20,
            deaths: 10,
            prestige: 1,
          },
        ],
      }
    ).as("pro");
    cy.mount(<ProLeagueCard />);
    cy.wait("@pro");
    cy.get('[aria-label="ProLeagueCard"]').contains("div", "test");
    cy.get('[aria-label="ProLeagueCard"]').contains("div", "test2");
  });

  it("has link to pro league page", () => {
    cy.mount(<ProLeagueCard />);
    cy.get('[aria-label="ProLeagueCard"]').find("button").should("exist");
    cy.get('[aria-label="ProLeagueCard"]')
      .find("button")
      .get('[data-testid="ArrowForwardOutlinedIcon"]')
      .should("exist");
  });
});
