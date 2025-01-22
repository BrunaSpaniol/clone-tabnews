import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result);

  return response.status(200).json({ message: "Respondeu uhuu" });
}

export default status;
