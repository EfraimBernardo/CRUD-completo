const { Pool } = require("pg");

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "crud",
    password: "Programator123",
    port: 5432,
});

db.connect()
  .then(() => console.log("PostgreSQL conectado com sucesso!"))
  .catch(err => console.error("Erro ao conectar ao PostgreSQL:", err));

module.exports = { db };
