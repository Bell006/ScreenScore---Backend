require("express-async-errors")

const AppError = require("./Utils/AppError")
const express = require("express");
const database = require("./database/sqlite");

//Importando as rotas
const routes = require("./Routes");

//inicializando o express
const app = express();
app.use(express.json());

app.use(routes);

app.use(( error, request, response, next ) => {

    //se for erro do cliente
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error)

    //se for erro do servidor
    return response.status(500).json({
         status: "error",
        message: "Internal server error"
    })
})

database();

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));