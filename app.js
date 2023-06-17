import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: "./.env" });


const app = express();
const bodyParser = express.json();
app.set("port",3003);
app.use(cors());
app.use(bodyParser);
app.use(express.static(path.join(__dirname, "public")));

//Import de Componentes
import db from "./Components/Database/Database.js";
import ClassGenerator from "./Components/ClassGenerator/ClassGenerator.js";
import logger from "./Components/Logger/Logger.js";
import classGenerator from "./Components/ClassGenerator/ClassGenerator.js";

app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}`);
});

app.get("/getCatalog", async (req, res) =>   {
    try {
        
        const catalog = await classGenerator.getCatalog();
        res.send({code:200, catalog:catalog, "message":"Catalogo obtenido correctamente"})
        logger.log("app", "getCatalog", "Catalogo despachado correctamente")

    } catch (error) {
        logger.log("app", "getCatalog", error)
    }
});

app.post("/generateClasses", async (req, res) => {
    try {
        classGenerator.run();
        res.send({code:200, "message":"Clases generadas correctamente"})
        logger.log("app", "generateClasses", "Clases generadas correctamente")

    } catch (error) {
        logger.log("app", "generateClasses", error)
    }
});


/*

let LogDialog = new LogDialog();

*css del LogDialog
absolute
esquina super derecha

metemos LogDialog en todas las vistas

*/