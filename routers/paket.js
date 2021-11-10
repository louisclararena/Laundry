const {request, response} = require("express")
const express = require("express")
const app = express()

//membaca request dari body dengan type json
app.use (express.json())

//panggil model
const models = require("../models/index")

//panggil model paket
const paket = models.paket

//endpoint to get all of paket
app.get("/", async (request,response)=>{
    let dataPaket = await paket.findAll()

    return response.json(dataPaket)
})

//endpoint add new paket
app.post("/", (request,response) =>{
    let newPaket = {
        jenis_paket: request.body.jenis_paket,
        harga: request.body.harga

    }
    paket.create(newPaket)
    .then(result => {
        response.json({
            message: `data berhasil ditambahkan`,
            data: result
        })
    })
    .catch(result => {
        response.json({
            message: error.message
        })
    })
})

//endpoint update data paket
app.put("/:id_paket", (request, response) => {
    //tampung data yang akan diubah
    let data = {
        jenis_paket: request.body.jenis_paket,
        harga: request.body.harga
    }

    let parameter = {
        id_paket: request.params.id_paket
    }

    //proses update
    paket.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message : `data berhasil diubah`,
            data: result
        })
    })
    .catch(error => {
        return response.json ({
            message: error.message
        })
    })
})
//endpoint hapus data paket
app.delete("/:id_paket", (request, response) => {
    //tampung data yang kan dihapus
    let parameter = {
        id_paket: request.params.id_paket
    }

    //proses hapus
    paket.destroy({
        where: parameter
    })
    .then(result => {
        return response.json ({
            message: `data berhasil dihapus`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

module.exports = app

