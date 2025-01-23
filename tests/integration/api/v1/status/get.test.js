describe("testing status api", () => {
  test("GET to /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    expect(response.status).toBe(200);
  });

  test("response.updated_at should return defined value", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    const responseBody = await response.json();

    expect(responseBody.updated_at).toBeDefined();
  });

  test("response.updated_at should have a valid ISOString", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    const responseBody = await response.json();

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  });

  test("max_conections should be defined and more than 0", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    const { database } = await response.json();

    expect(database.max_connections).toBeGreaterThan(0);
  });

  test("max_conections should be more than opened_connections", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    const { database } = await response.json();

    expect(database.max_connections).toBeGreaterThan(
      database.opened_connections,
    );
  });

  test("Postgres version should be a valid string", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    const { database } = await response.json();

    console.log(database.version);

    // expect(database.version).toBeDefined();

    expect(database.version.length).toBeGreaterThan(0);
  });
});
