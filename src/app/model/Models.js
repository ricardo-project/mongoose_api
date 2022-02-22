const mongoose = require("mongoose");
const RoundSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true
    }, inicio: {
        type: Date,
        required: true
    }, fim: {
        type: Date,
        required: true
    }, modo: {
        type: String,
        required: true
    }
})
const PartidaSchema = new mongoose.Schema({
    inicio: {
        type: Date,
        required: true
    }, fim: {
        type: Date,
        required: true
    }, rounds: {
        type: [RoundSchema],
        required: true
    }
})
const JogadorSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    pontos: {
        type: Number,
        required: true
    },
    data_ultimo_login: {
        type: Date,
        required: true
    },
    partidas: {
        type: [PartidaSchema],
        required: true
    }
})
const EnderecoSchema = new mongoose.Schema({
    cep: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    complemento: {
        type: String,
        required: false
    },
    jogadores: {
        type: [JogadorSchema],
        required: true
    }
});
module.exports = mongoose.model("Endereco", EnderecoSchema);