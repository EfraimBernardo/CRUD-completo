const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const userRoutes = require("./routes/users");

const PORT = 3388;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});

app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`App rodando em http://localhost:${PORT}`);
});
