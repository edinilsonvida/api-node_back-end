const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Deletando e recriando tabelas.");
  });

// analisa as solicitações de tipo de conteúdo - application/json
app.use(bodyParser.json());

// analisa as solicitações de tipo de conteúdo - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// define a rota raiz
app.get("/", (req, res) => {
    res.json({ message: "Olá mundo!" });
});

require("./app/routes/post.routes")(app);

// define a porta principal e recebe as solicitações
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}.`);
});