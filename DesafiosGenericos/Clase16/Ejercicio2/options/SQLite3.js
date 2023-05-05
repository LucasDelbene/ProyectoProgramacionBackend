//CREO EL STRING CONNECTION a SQLite3//
const options = {
    client: "sqlite3",
    connection: {
        filename: "./DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}

export {options}