const Endereco = require("../model/Models")
const urlImg = 'https://images.vexels.com/media/users/3/136479/isolated/preview/72ca95e059828aea4edc31c04b0556ce-proxima-seta-1.png'
const num = (index, N) => {
    return (index % 2) + 1 + 2*N
}
const last = (array) => {
    return array[array.length - 1]
}
const Style = `
<link rel=stylesheet href="https://fonts.googleapis.com/css?family=Raleway">
<style>
    body {
        text-align: center;
        font-family: Raleway;
        background: rgb(50,50,50)
    } p {
        margin: 5px 0px
    } .title {
        color: rgb(210,210,210);
        font-size: 40px;
        font-weight: bold;
        text-shadow: rgb(0,0,0,0.2) 3px 3px 0px
    } .subtit, ul {
        color: rgb(180,180,180);
        font-size: 20px;
        text-shadow: rgb(0,0,0,0.2) 2px 2px 0px
    } ul {
        text-align: left
    }
</style>`
const addSub = (letra, txt) => {
    const V = "all" + letra
    return `<div class='sub ` + letra + `'>
        <div class='show` + letra + ` show' onclick="
            let ` + V + ` = this.parentElement
            let seta = ` + V + `.querySelector('.seta')
            if(` + V + `.style.height !== '') {
                ` + V + `.style.cssText = ''
                seta.style.cssText = ''
            } else {
                ` + V + `.style.height = 'max-content'
                seta.style.transform = 'rotate(270deg)'
            }
        "><img draggable=false class=seta src='` + urlImg + `'><p>Mostrar ` + txt + `</p></div>`
}
const addAttrUpd = (attrUpd) => {
    let txt = ""
    for(let i = 0; i < attrUpd.length - 1; i++) {
        txt += attrUpd[i] + ", "
    } txt += attrUpd.slice(-1)[0] + "</p>"
    return txt
}
const createHTML = (end) => {
    let html = `
    <link rel=stylesheet href="https://fonts.googleapis.com/css?family=Raleway|Merriweather">
    <style>
        body {
            background: #2f2b2a;
            margin: 10px;
            font-size: 18px;
            font-family: Raleway;
            filter: drop-shadow(rgb(0,0,0,.4) 4px 4px 0px);
            color: #bacca4;
        } .title {
            text-align: center;
            color: #7dad93;
            font-size: 50px;
            font-weight: bold;
            margin-bottom: 10px;
            font-family: Merriweather;
        } .item {
            position: relative;
            padding: 3px 6px;
        } .item1 {
            background: #0a516d
        } .item2 {
            background: #034055
        } .item3 {
            background: #094242
        } .item4 {
            background: #043535
        } .item5 {
            background: #334033
        } .item6 {
            background: #27352b
        } .item7 {
            background: #503f3b
        } .item8 {
            background: #453533
        } .seta {
            height: 25px;
            transform: rotate(90deg);
            filter: invert(1)
        } .show {
            height: 20px;
            overflow: hidden;
            cursor: pointer;
            padding: 2px;
            display: flex;
            align-items: center;
            font-size: 12px;
            position: relative;
            justify-content: space-between
        } .sub {
            height: 24px;
            overflow: hidden;
        } .sub .seta {
            transition: all 0.2s ease
        } .J {
            font-size: 16px;
            background: #04283d;
        } .P {
            background: #092626
        } .R {
            background: #182414
        } p {
            margin: 3px 0px;
        } .warning {
            text-align: center;
            color: #f3db9d;
        }
    </style>
    <p class=title>Tabelas</p>`
    if(end.length == 0) {
        html += `<p class=warning>Não há dados no momento... Insira nos outros serviços!`
    } end.forEach((elem, index) => {
        html += `<div class='item item` + num(index, 0) + `'>
            <p><b>ID</b>: ` + elem._id + `</p>
            <p><b>Complemento</b>: `
            if(elem.complemento == "") {
                html += ` <i>Nenhum inserido</i>`
            } else {
                html += elem.complemento
            }
        html += ` <p><b>Número</b>: ` + elem.numero + `</p></div>`
        if(elem.jogadores.length > 0) {
            html += addSub('J', 'jogadores')
            elem.jogadores.forEach((elem2, index2) => {
                html += `<div class='item item` + num(index2, 1) + `'>
                    <p><b>Nickname</b>: ` + elem2._id + `</p>
                    <p><b>Senha</b>: ` + elem2.senha + `</p>
                    <p><b>Pontos</b>: ` + elem2.pontos + `<p>
                    <p><b>Data do último login</b>: ` + elem2.data_ultimo_login + `</p>
                </div>`
                if(elem2.partidas.length > 0) {
                    html += addSub('P', 'partidas')
                    elem2.partidas.forEach((elem3, index3) => {
                        html += `<div class='item item` + num(index3, 2) + `'>
                            <p><b>ID</b>: ` + elem3._id + `</p>
                            <p><b>Início</b>: ` + elem3.inicio + `</p>
                            <p><b>Fim</b>: ` + elem3.fim + `</p>
                        </div>`
                        if(elem3.rounds.length > 0) {
                            html += addSub('R', 'rounds')
                            elem3.rounds.forEach((elem4, index4) => {
                                html += `<div class='item item` + num(index4, 3) + `'>
                                    <p><b>ID</b>: ` + elem4._id + `</p>
                                    <p><b>Número</b>: ` + elem4.numero + `</p>
                                    <p><b>Início</b>: ` + elem4.inicio + `</p>
                                    <p><b>Fim</b>: ` + elem4.fim + `</p>
                                    <p><b>Modo</b>: ` + elem4.modo + `</p>
                                </div>`
                            }); html += `</div>`
                        }
                    }); html += `</div>`
                }
            }); html += `</div>`
        }
    })
    return html
}
class Controller {
    async storePartida(req, res) {
        const { endereco_id, jogador_id, partida } = req.body
        const data = await Endereco.findOne({ _id: endereco_id })
        const listJ = data.jogadores
        for(let j = 0; j < listJ.length; j++) {
            if(listJ[j]._id == jogador_id) {
                data.jogadores[j].partidas.push(partida)
                await data.save()
                return res.status(201).send(Style + `
                <p class=title>Partida adicionada com sucesso</p>
                <p class=subtit><b>ID</b>: ` + last(data.jogadores[j].partidas)._id + `</p>`)
            }
        } return res.status(404).send(Style + `
        <p class=title>Erro 404 (Não encontrado)</p>
        <p class=subtit>Não foi encontrado um jogador para fazer a adição da partida!</p>`)
    }
    async uptadeOrDeletePartida(req, res) {
        const { partida_id, partida } = req.body
        const data = await Endereco.find({})
        for(let e = 0; e < data.length; e++) {
            const listJ = data[e].jogadores
            for(let j = 0; j < listJ.length; j++) {
                const listP = listJ[j].partidas
                for(let p = 0; p < listP.length; p++) {
                    if(listP[p]._id == partida_id) {
                        if(typeof partida == "object") {
                            let attr = Object.keys(partida)
                            let attrP = Object.keys(listP[p]._doc)
                            let attrUpd = []
                            attrP.splice(attrP.indexOf("_id"), 1)
                            attr.forEach(elem => {
                                for(let k = 0; k < attrP.length; k++) {
                                    if(attrP[k] == elem) {
                                        attrUpd.push(elem)
                                        listP[p][elem] = partida[elem]
                                        attrP.splice(k, 1)
                                        return
                                    }
                                }
                            }); const dataE = await Endereco.findOne({ _id: data[e]._id })
                            dataE.jogadores[j].partidas[p] = listP[p]
                            await dataE.save()
                            let txt = Style + `
                            <p class=title>Partida atualizada com sucesso</p>
                            <p class=subtit><b>Atributos atualizados</b>: `
                            txt += addAttrUpd(attrUpd)
                            return res.status(200).send(txt)
                        } else {
                            const dataE = await Endereco.findOne({ _id: data[e]._id })
                            dataE.jogadores[j].partidas.splice(p, 1)
                            await dataE.save()
                            return res.status(200).send(Style + `
                            <p class=title>Partida removida com sucesso</p>
                            <p class=subtit><b>ID</b>: ` + partida_id + `</p>`)
                        }
                    }
                }
            }
        } return res.status(404).send(Style + `
        <p class=title>Erro 404 (Não encontrado)</p>
        <p class=subtit>Não foi encontrado uma partida com o ID para fazer atualização ou exclusão!</p>`)
    }
    async storeRound(req, res) {
        const { partida_id, round } = req.body
        const data = await Endereco.find({})
        for(let e = 0; e < data.length; e++) {
            const listJ = data[e].jogadores
            for(let j = 0; j < listJ.length; j++) {
                const listP = listJ[j].partidas
                for(let t = 0; t < listP.length; t++) {
                    if(listP[t]._id == partida_id) {
                        const dataE = await Endereco.findOne({ _id: data[e]._id })
                        const oldPartidas = listP
                        dataE.jogadores[j].partidas[t].rounds.push(round)
                        await dataE.save()
                        return res.status(201).send(Style + `
                        <p class=title>Round adicionado com sucesso</p>
                        <p class=subtit><b>ID</b>: ` + last(dataE.jogadores[j].partidas[t].rounds)["_id"] + `</p>`)
                    }
                }
            }
        } return res.status(404).send(Style + `
        <p class=title>Erro 404 (Não encontrado)</p>
        <p class=subtit>Não foi encontrado uma partida para fazer a adição do round!</p>`)
    }
    async updateOrDeleteRound(req, res) {
        const { round_id, round } = req.body
        const data = await Endereco.find({})
        for(let e = 0; e < data.length; e++) {
            const listJ = data[e].jogadores
            for(let j = 0; j < listJ.length; j++) {
                const listP = listJ[j].partidas
                for(let p = 0; p < listP.length; p++) {
                    const listR = listP[p].rounds
                    for(let r = 0; r < listR.length; r++) {
                        if(listR[r]._id == round_id) {
                            if(typeof round == "object") {
                                let attr = Object.keys(round)
                                let attrR = Object.keys(listR[r]._doc)
                                let attrUpd = []
                                attrR.splice(attrR.indexOf("_id"), 1)
                                attr.forEach(elem => {
                                    for(let k = 0; k < attrR.length; k++) {
                                        if(attrR[k] == elem) {
                                            attrUpd.push(elem)
                                            listR[r][elem] = round[elem]
                                            attrR.splice(k, 1)
                                            return
                                        }
                                    }
                                }); const dataE = await Endereco.findOne({ _id: data[e]._id })
                                dataE.jogadores[j].partidas[p].rounds[r] = listR[r]
                                await dataE.save()
                                let txt = Style + `
                                <p class=title>Round atualizado com sucesso</p>
                                <p class=subtit><b>Atributos atualizados</b>: `
                                txt += addAttrUpd(attrUpd)
                                return res.status(200).send(txt)
                            } else {
                                const dataE = await Endereco.findOne({ _id: data[e]._id })
                                dataE.jogadores[j].partidas[p].rounds.splice(r, 1)
                                await dataE.save()
                                return res.status(200).send(Style + `
                                <p class=title>Round removido com sucesso</p>
                                <p class=subtit><b>ID</b>: ` + round_id + `</p>`)
                            }
                        }
                    }
                }
            }
        } return res.status(404).send(Style + `
        <p class=title>Erro 404 (Não encontrado)</p>
        <p class=subtit>Não foi encontrado um round com o ID para fazer atualização ou exclusão!</p>`)
    }
    async store(req, res) {
        let lineHTML = Style + `<p class=title>Endereços e jogadores inseridos!</p>
        <p class=subtit>Confira, após isso, o serviço de listagem...</p>
        <ul>`
        for(let e of req.body) {
            const data = await Endereco.create(e)
            lineHTML += "<li><b>ID</b>: " + data._id + "</li>"
        } lineHTML += "</ul>"
        return res.status(201).send(lineHTML);
    }
    async list(req, res) {
        const dataE = await Endereco.find({});
        const htmlEnd = createHTML(dataE)
        return res.status(200).send(htmlEnd);
    }
    async delete(req, res) {
        const data = await Endereco.deleteMany({})
        return res.status(200).send(Style + `
        <p class=title>Exclusão efetuada com sucesso!</p>
        <p class=subtit>O ambiente está completamente preparado para novos testes...</p>`)
    }
}
module.exports = new Controller();