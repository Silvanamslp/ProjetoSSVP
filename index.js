const express = require ("express");
const cookieParser = require ("cookie-parser");
const sessions = require ("express-session");
const { render } = require("ejs");
const app = express();
const PORT = 3000;
const oneDay = 1000*60*60*24;//milissegundos




app.use (sessions({
    secret:"thisismysecretkeyfhrg84",
    saveUninitialized:true,
    cookie: { maxAge:oneDay },
    resave:false
}));

app.use (express.json());

app.use (express.urlencoded({
    extended:true
}))

app.use(express.static(__dirname));

app.use(cookieParser());

const email = "cz.paiva08@gmail.com";
const inputPassword2 = "123";

var session;

app.set("view engine", "ejs");


app.get("/", function(req, res){
    session = req.session;
    if(session.userid){
        res.send("Bem vindo, confrade <a href = \'/logout'> clique para logar </a>");
    }
    else{
        res.render("home");        
    }
});

app.post("/conferencia", function(req, res){
    
    if (req.body.email == "cz.paiva08@gmail.com" && req.body.inputPassword2 == "123"){
        session = req.session;
        session.userid = req.body.email;
        console.log (req.session);
            res.render("conferencia");
            res.send("Olá confrade, bem-vindo!<a href = \'/logout'> voltar a página inicial</a>");//se comentar essa linha o render (conferencia funciona)
    }
    else{
        res.send("nome ou senha invalida");
        
    }
});

app.get("/logout", function(req, res){
    req.session.destroy();
    res.redirect("/");
});
app.listen (PORT, function(){
    console.log(" servidor rodando na porta", {PORT})
});







