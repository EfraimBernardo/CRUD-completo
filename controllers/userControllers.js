const { db } = require("../db.js");

// LISTAR TODOS OS USUÁRIOS
exports.list = async (req, res) => {
    db.query("SELECT * FROM users ORDER BY id DESC", (err, result) => {
        if (err) {
            console.log("Erro ao consultar o banco!", err);
            return res.status(500).json({ message: "Erro ao consultar o banco!" });
        }
        return res.status(200).json(result.rows);
    });
};

// CADASTRAR NOVO USUÁRIO
exports.addUser = async (req, res) => {
    const { PrimeiroNome, UltimoNome, Email, Numero } = req.body;

    const query = `
        INSERT INTO users (PrimeiroNome, UltimoNome, Email, Numero)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `;

    db.query(query, [PrimeiroNome, UltimoNome, Email, Numero], (err, result) => {
        if (err) {
            console.log("Erro ao adicionar usuário:", err);
            return res.status(500).json({ message: "Erro ao adicionar usuário!" });
            console.log(err);
        }

        return res.status(201).json({
            id: result.rows[0].id,
            PrimeiroNome,
            UltimoNome,
            Email,
            Numero
        });

        console.log(result);

    });
};

// ATUALIZAR USUÁRIO
exports.putUser = async (req, res) => {
    const { id } = req.params;
    const { PrimeiroNome, UltimoNome, Email, Numero } = req.body;

    const query = `
        UPDATE users
        SET PrimeiroNome = $1, UltimoNome = $2, Email = $3, Numero = $4
        WHERE id = $5
    `;

    db.query(query, [PrimeiroNome, UltimoNome, Email, Numero, id], (err, result) => {
        if (err) {
            console.log("Erro ao atualizar usuário:", err);
            return res.status(500).json({ message: "Erro ao atualizar usuário!" });
        }

        return res.status(200).json({
            id,
            PrimeiroNome,
            UltimoNome,
            Email,
            Numero
        });
    });
};

// ELIMINAR USUÁRIO
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM users WHERE id = $1", [id], (err, result) => {
        if (err) {
            console.log("Erro ao eliminar usuário:", err);
            return res.status(500).json({ message: "Erro ao eliminar usuário!" });
        }

        return res.status(200).json({ message: "Usuário eliminado com sucesso!" });
    });
};

// LOGIN DO USUÁRIO
exports.userLogin = async (req, res) => {
    const { Email, Numero } = req.body;

    const query = "SELECT * FROM users WHERE Email = $1 AND Numero = $2";

    db.query(query, [Email, Numero], (err, result) => {
        if (err) {
            console.log("Erro ao buscar usuário:", err);
            return res.status(500).json({ message: "Erro ao buscar usuário!" });
        }

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Dados incorretos!" });
        }

        return res.status(200).json({
            message: "Login efetuado com sucesso!",
            Usuario: result.rows[0]
        });
    });
};
