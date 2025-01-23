import database from "infra/database";

async function status(request, response) {
  const maxConnections = await database.query(
    "SELECT setting::int FROM pg_settings WHERE name = 'max_connections';",
  );

  const openedConnections = await database.query(
    "SELECT count(*) connections FROM pg_stat_activity;",
  );

  const databaseVersionRequest = await database.query("SELECT version();");

  const databaseVersion =
    await databaseVersionRequest.rows[0].version.split(" ");

  const data = {
    updated_at: new Date().toISOString(),
    database: {
      max_connections: maxConnections.rows[0].setting,
      opened_connections: Number(openedConnections.rows[0].connections),
      version: databaseVersion[1],
    },
  };

  return response.status(200).json(data);
}

export default status;
