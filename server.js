// configuração do servidor
const express = require("express");
const server = express();

// configuração para apresentação de arquivos estáticos
server.use(express.static('public'));

// habilita body do formulário
server.use(express.urlencoded({extended: true}));

//configuração da template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true
});

// lista de doadores: Vetor ou Array
const donors = [
    {
        name: "Flávio Latorre",
        blood: "AB+"
    },
    {
        name: "Ana Carolina Hernandes",
        blood: "B+"
    },
    {
        name: "Neriell Ferri",
        blood: "A+"
    },
    {
        name: "Hanagarik Espiriquidiberto",
        blood: "O+"
    }
];

// configuração de apresentação da página
server.get("/", function (req, res) {
    return res.render("index.html", {donors});
});

server.post("/", function(req, res){
    // pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    // acrescenta valores no Array
    donors.push({
        name: name,
        blood: blood
    });

    return res.redirect("/");
});


// liga o server e permite o acesso na porta 3000
server.listen(3000, function () {
    console.log("Server no ar.");
});