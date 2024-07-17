import mysql from 'mysql2/promise'


//*Connection
const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventory",
    waitForConnections: true
});

conn.getConnection((err) => {
    if (err) {
        console.log("Connection Error!", err);
    } else {
        console.log("Connected!");
    }
})

export default conn