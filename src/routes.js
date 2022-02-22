const express = require("express");
const routes = express.Router();
const Controller = require("./app/controller/PartidaRoundController");
routes.get("/", function (req, res) {
    return res.send("O servidor está funcionando plenamente!!!");
});
module.exports = routes;
routes.get("/lista", Controller.list);
routes.get("/deleteAll", Controller.delete);
routes.post("/addAll", Controller.store);
routes.post("/partida/store", Controller.storePartida);
routes.post("/partida/updateDelete", Controller.uptadeOrDeletePartida);
routes.post("/round/store", Controller.storeRound);
routes.post("/round/updateDelete", Controller.updateOrDeleteRound);