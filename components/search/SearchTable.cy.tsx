import SearchTable from "./SearchTable";

describe("<SearchTable>", () => {
  const data = [
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
  ];

  it("mounts", () => {
    cy.mount(<SearchTable rows={data} page={0} />);
  });

  it("renders", () => {
    cy.mount(<SearchTable rows={data} page={0} />);
    cy.get("table").should("exist");
  });

  it("renders rows", () => {
    cy.mount(<SearchTable rows={data} page={0} />);
    cy.get("table").should("exist");
    cy.get("tbody").children().should("have.length", 2);
  });

  it("renders rows with correct data", () => {
    cy.mount(<SearchTable rows={data} page={0} />);
    const firstRow = cy.get("tbody").children().first();
    const firstRowItems = firstRow.children();
    firstRowItems.first().should("have.text", "1");
    firstRowItems.last().should("have.text", "1");
    const SecondRow = cy.get("tbody").children().last();
    const SecondRowItems = SecondRow.children();
    SecondRowItems.first().should("have.text", "2");
    SecondRowItems.last().should("have.text", "2");
  });

  it("has correct number of columns visible on mobile", () => {
    cy.mount(<SearchTable rows={data} page={0} />);
    cy.viewport("iphone-6");
    cy.get("thead")
      .children()
      .first()
      .children()
      .filter(":visible")
      .should("have.length", 5);
  });

  it("has correct number of columns visible on desktop", () => {
    cy.mount(<SearchTable rows={data} page={0} />);
    cy.viewport("macbook-16");
    cy.get("thead")
      .children()
      .first()
      .children()
      .filter(":visible")
      .should("have.length", 8);
  });

  it("Link to league page has correct href", () => {
    cy.mount(<SearchTable rows={data} page={0} />);
    cy.get("a").should("have.attr", "href", "/bronze");
  });
});
