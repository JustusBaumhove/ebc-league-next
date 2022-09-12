import SingleInfoCard from "./SingleInfoCard";

describe("<SingleInfoCard>", () => {
  it("mounts", () => {
    cy.mount(
      <SingleInfoCard
        color={"#fff"}
        content={"test"}
        icon={<></>}
        title={"test"}
      />
    );
  });

  it("renders", () => {
    cy.mount(
      <SingleInfoCard title="test" content="test" color="#fff" icon={<></>} />
    );
    const card = cy.get("[aria-label='InfoCard']");
    card.should("exist");
  });

  it("has expected values", () => {
    cy.mount(
      <SingleInfoCard title="test" content="test" color="#fff" icon={<></>} />
    );
    const card = cy.get("[aria-label='InfoCard']");
    card.get("[aria-label='content']").should("have.text", "TEST");
    card.get("[aria-label='title']").should("have.text", "TEST");
    card.get("[aria-label='Icon']").should("exist");
  });

  it("has expected style", () => {
    cy.mount(
      <SingleInfoCard title="test" content="test" color="#fff" icon={<></>} />
    );
    const card = cy.get("[aria-label='InfoCard']");
    card.should("have.css", "padding", "8px");
    card
      .get("[aria-label='Icon']")
      .should("have.css", "backgroundColor", "rgba(0, 0, 0, 0)");
  });
});
