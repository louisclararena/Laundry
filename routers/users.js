const { request, response } = require("express")
const express = require("express")
const app = express()
const md5 = require("md5")

app.use(express.json())

const models = require("../models/index")
const users = models.users

//endpoind get
app.get("/", async (request, response) => {
    let dataUsers = await users.findAll()

    return response.json(dataUsers)
})

//endpoint insert new users
app.post("/", (request, response) => {
    let newUsers = {
        nama: request.body.nama,
        username: request.body.username,
        password: md5(request.body.
            
            password),
        role: request.body.role
    }
    users.create(newUsers)
    .then(result => {
        return response.json ({
            message: `data berhasil ditambahkan`,
            data : result
        })
    })
    .catch(result => {
        return response.json ({
            message: error.message
        })
    })
})

// enpoint update data users
app.put("/:id_user", (request, response) => {
    let data = {
        nama: request.body.nama,
        username: request.body.username,
        role: request.body.role
    }
    if (request.body.password) {
        data.password = md5(request.body.password)
    }
    let parameter = {
        id_user: request.params.id_user
    }

    //proses update
    users.update(data, {where: parameter})
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

//endpoint hapus data users
app.delete("/:id_user", (request, response) => {
    //tampung data yang kan dihapus
    let parameter = {
        id_user: request.params.id_user
    }

    //proses hapus
    users.destroy({
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