const pool = require("./db");

async function testarConexao() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Conectado ao PostgreSQL! Hora atual:", result.rows[0]);
    } catch (err) {
        console.error("Erro ao conectar ao PostgreSQL:", err);
    } finally {
        pool.end();
    }
}

testarConexao();