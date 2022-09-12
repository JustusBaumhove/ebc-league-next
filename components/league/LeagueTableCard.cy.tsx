import LeagueTableCard from "./LeagueTableCard";

describe("<LeagueTableCard>", () => {
  it("mounts", () => {
    cy.mount(<LeagueTableCard league="bronze" maxPlayers={0} />);
  });

  it("renders", () => {
    cy.mount(<LeagueTableCard league="bronze" maxPlayers={0} />);
    cy.get('[aria-label="LeagueTableCard"]').should("exist");
  });

  it("has expected number of children", () => {
    cy.mount(<LeagueTableCard league="bronze" maxPlayers={0} />);
    cy.get('[aria-label="LeagueTableCard"]')
      .children()
      .should("have.length", 3);
  });

  it("has expected text when no data is passed", () => {
    cy.mount(<LeagueTableCard league="bronze" maxPlayers={0} />);
    cy.get('[aria-label="LeagueTableCard"]').contains(
      "div",
      "No data available."
    );
  });

  it("has expected text when no data is answered by the api", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/league/bronze/0",
      },
      {
        body: [],
      }
    ).as("bronze");
    cy.mount(<LeagueTableCard league="bronze" maxPlayers={0} />);
    cy.wait("@bronze");
    cy.get('[aria-label="LeagueTableCard"]').contains(
      "div",
      "No data available."
    );
  });

  it("has expected text when the api answers with at least one result on mobile", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/league/bronze/0",
      },
      {
        body: [
          {
            id: 1,
            name: "test",
            skill: 100,
            ratio: 1.0,
            kills: 1,
            deaths: 0,
            prestige: 0,
          },
        ],
      }
    ).as("bronze");
    cy.mount(<LeagueTableCard league="bronze" maxPlayers={1} />);
    cy.wait("@bronze");
    const tableBody = cy.get("tbody");
    tableBody.children().should("have.length", 1);
    tableBody.children().filter(":visible").should("have.length", 4);
  });

  it("has expected text when the api answers with at least one result on desktop", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/league/bronze/0",
      },
      {
        body: [
          {
            id: 1,
            name: "test",
            skill: 100,
            ratio: 1.0,
            kills: 1,
            deaths: 0,
            prestige: 0,
          },
        ],
      }
    ).as("bronze");
    cy.viewport("macbook-16");
    cy.mount(<LeagueTableCard league="bronze" maxPlayers={1} />);
    cy.wait("@bronze");
    const Card = cy.get('[aria-label="LeagueTableCard"]');
    Card.get("tbody").children().should("have.length", 1);
    Card.get("tbody")
      .children()
      .first()
      .should("have.class", "MuiTableRow-root");
    Card.get("tbody").children().first().children().should("have.length", 7);
  });

  it("has expected icon", () => {
    cy.mount(<LeagueTableCard league="bronze" maxPlayers={0} />);
    cy.get('[aria-label="Icon"]').should("exist");
    cy.get('[aria-label="Icon"]')
      .children()
      .first()
      .should("have.class", "MuiSvgIcon-root");
    cy.get('[aria-label="Icon"]')
      .children()
      .first()
      .get('[data-testid="StarIcon"]')
      .should("exist");
  });
});
