import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "sql5.freesqldatabase.com",   
    user: "sql5810923",                 
    password: "5Tx3KA6wsr",             
    database: "sql5810923",             
    port: 3306,                         
});

export default pool;
