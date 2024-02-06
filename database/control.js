const { OPEN_READWRITE } = require("sqlite3")

const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database.db", OPEN_READWRITE ,(err) => {
    console.log(err)
})

db.exec(`
    create table data(
        id int    
    );
    insert into data(id) values (1);
`)

db.serialize(() => {
    db.each(`select * from data`, (e, row) => {
        if(e) {
            console.log("ERROR WHILE SELECT: ", e)
        }else{
            console.log(row.id)
        }
    })
})

function initialize_database(){

}

function insert(){


}

function select(){

}

module.exports = {
    initialize_database,
    insert,
    select
}