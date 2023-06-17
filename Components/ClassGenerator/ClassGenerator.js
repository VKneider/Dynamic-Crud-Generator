import fs from "fs";
import db from "../Database/Database.js";


class ClassGenerator {
    constructor(dbComponent) {
        this.dbComponent = dbComponent;
    }

    generateClassContent(tableName, fields) {
        let content = `class ${tableName} {\n`;
        // Generar el constructor con los atributos obtenidos
        content += "  constructor({";
        Object.keys(fields).forEach(fieldName => {
            content += `    ${fieldName},`;
        });
        content += "  }) {\n";
        // Asignar los atributos al objeto
        Object.keys(fields).forEach(fieldName => {
            content += `    this.${fieldName} = ${fieldName};\n`;
        });
        content += "  }\n";
        content += "}\n";
        return content;
    }

    generateClassFiles(catalog) {
        Object.keys(catalog).forEach(tableName => {
            const fields = catalog[tableName];
            const classContent = this.generateClassContent(tableName, fields);

            // Crear el archivo con el contenido de la clase
            fs.writeFile(`${tableName}.js`, classContent, err => {
                if (err) {
                    console.error(`❌ Error al crear el archivo ${tableName}.js:`, err);
                } else {
                    console.log(`✅ Archivo ${tableName}.js creado exitosamente.`);
                }
            });
        });
    }

    async getCatalog() {

        try {
            const result = await this.dbComponent.executeQuery("catalogQuery");

            const catalog = {};

            result.rows.forEach(row => {
                const { table_name, column_name, data_type } = row;
                if (!catalog[table_name]) {
                    catalog[table_name] = {};
                }
                catalog[table_name][column_name] = { data_type };
            });

            return catalog;
        } catch (error) {
            console.error("Error al obtener el catálogo de tablas y campos:", error);
        }
    }

    run = async () => {

        try {
            const catalog = await this.getCatalog();

        // Crear la carpeta si no existe
        const folderName = "./TableModels";
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }


        // Cambiar al directorio de la carpeta
        process.chdir(folderName);

        // Generar los archivos de clases
        this.generateClassFiles(catalog);
        } catch (error) {
            console.log(error)
        }
        
    };


}

let classGenerator = new ClassGenerator(db);
export default classGenerator;


