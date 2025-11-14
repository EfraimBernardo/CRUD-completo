// Função para mensagens
        function mostrarMensagem(elemento, texto, tipo) {
            const div = document.getElementById(elemento);
            div.style.display = "block";
            div.className = `msg ${tipo}`;
            div.textContent = texto;
        }

        // ============================
        // CADASTRAR USUÁRIO
        // ============================
        function cadastrar() {
            const PrimeiroNome = document.getElementById("primeiroNome").value;
            const UltimoNome = document.getElementById("ultimoNome").value;
            const Email = document.getElementById("email").value;
            const Numero = document.getElementById("numero").value;

            fetch("/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ PrimeiroNome, UltimoNome, Email, Numero })
            })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    mostrarMensagem("msg", "Usuário cadastrado com sucesso!", "sucesso");
                } else {
                    mostrarMensagem("msg", data.message || "Erro no cadastro!", "erro");
                }
            })
            .catch(() => mostrarMensagem("msg", "Erro ao comunicar com o servidor!", "erro"));
        }


        // ============================
        // LOGIN DO USUÁRIO
        // ============================
        function login() {
            const Email = document.getElementById("loginEmail").value;
            const Numero = document.getElementById("loginNumero").value;

            fetch("/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Email, Numero })
            })
            .then(res => res.json())
            .then(data => {
                if (data.Usuario) {
                    mostrarMensagem("msgLogin", "Login efetuado com sucesso!", "sucesso");
                } else {
                    mostrarMensagem("msgLogin", data.message || "Dados incorretos!", "erro");
                }
            })
            .catch(() => mostrarMensagem("msgLogin", "Erro ao comunicar com o servidor!", "erro"));
        }