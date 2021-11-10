const { request, response } = require("express")
const express = require("express")
const app = express()

//membaca request dari body dengan type json
app.use(express.json())

//panggil model
const models = require("../models/index")

//panggil model " member"
const member = models.member

//pamhhil fungsi auth
const {auth} = require("./login")

//fungsi auth dijadikan middlewarw
app.use(auth)

//endpoint for get all member
app.get("/", async (request, response) => {
    let dataMember = await member.findAll()

    return response.json(dataMember)
})

//endpoint add new member
app.post("/", (request, response) => {
    let newMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.jenis_kelamin,
        telepon: request.body.telepon

    }

    member.create(newMember)
    .then(result => {
        response.json({
            message: `Data Berhasil Ditambahkan`
        })
    })
    .catch(result => {
        response.json({
        message: error.message
        })
       
    })
})

//endpoint update  data member
app.put("/:id_member", (request, response) =>{
    //tampung data yang akan diubah
    let data = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        telepon: request.body.telepon,
        jenis_kelamin: request.jenis_kelamin
    }

    let parameter = {
        id_member: request.params.id_member
    }

    //proses update
    member.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message: `data berhasil diubah`,
            data: result
        })
    })
    .catch(error => {
        return response.json ({
            message: error.message
        })
    })
})

//endpoint hapus dtaa member
app.delete("/:id_member", (request, response) => {
    //tampung data yang kan dihapus
    let parameter = {
        id_member: request.params.id_member
    }

    //proses hapus
    member.destroy({
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
