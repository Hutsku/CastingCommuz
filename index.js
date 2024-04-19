
// ============================================= INITALIZATION ============================================

let date = new Date()
let date_string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()+2}:${date.getMinutes()}:${date.getSeconds()}`
console.log(`==================== ${date_string} ====================`)
console.log('Initalisation du site web ...')
var fs     = require('fs');

// On importe tout les modules necessaires
console.log('Importation des modules ...');
const path     = require('path');
var express    = require('express');
var session    = require('express-session');
var bodyParser = require("body-parser");

var app;
var urlencodedParser;
function app_init () {
    // init app et configure les cookies de session
    app = express();
    urlencodedParser = bodyParser.urlencoded({ extended: false });

    app.use(express.static(__dirname + '/public'));
    app.use('/scripts', express.static(__dirname + '/node_modules/'));
    app.use('/static', express.static(__dirname + '/public'));
    app.use('/', express.static(__dirname));
    app.set('view engine', 'ejs');  

    console.log("> Création de l'app et cookies de session configurés.");
};

// ---------------------- LAUNCH INIT -------------------
// init the other functionnality
app_init();

// ================================================ ROUTES ===============================================

console.log('Création des routes POST et GET')
app.get('/', function(req, res) {
    let gallery_backstage = fs.readdirSync('./public/img/backstage/gallery');
    let gallery_halv = fs.readdirSync('./public/img/halv/gallery');
    let gallery_enmemoria = fs.readdirSync('./public/img/enmemoria/gallery');
    res.render('mainpage.ejs', {
        session: req.session,
        gallery_halv: gallery_halv,
        gallery_backstage: gallery_backstage,
        gallery_enmemoria: gallery_enmemoria
    });
})
.get('/demo', function(req, res) {
    //let gallery = fs.readdirSync('./public/img/demo');
    res.render('demo.ejs', {
        session: req.session,
    });
})
.get('/backstage', function(req, res) {
    let gallery = fs.readdirSync('./public/img/backstage/gallery');
    res.render('backstage.ejs', {
        session: req.session,
        gallery: gallery
    });
})
.get('/halv', function(req, res) {
    let gallery = fs.readdirSync('./public/img/halv/gallery');
    res.render('halv.ejs', {
        session: req.session,
        gallery: gallery
    });
})
.get('/en_memoria', function(req, res) {
    let gallery = fs.readdirSync('./public/img/enmemoria/gallery');
    res.render('en_memoria.ejs', {
        session: req.session,
        gallery: gallery
    });
})


// ========================================================================================================

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

// On ouvre le serveur sur le port 8080
console.log('Ouverture du serveur sur le port 8081')
app.listen(8081, 'localhost');