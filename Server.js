const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public')); // Agregamos la ruta public para obtener el index y los estilos

// CONEXION
var con = mysql.createConnection({
    host : 'localhost',
    user : 'brian8',
    password: 'brian',
    database: 'veterinaria',
})

app.set('view engine', 'ejs');


//Mostrar Formulario Membresia
app.get('/',(req, res)=>{
    con.query('SELECT * FROM clientes', (error, rows)=>{
        if(error) throw error;
        //console.log(rows);
       return res.render('form', {rows});
    })
})

// Registrar Membresia
app.post('/', (req, res)=>{
    let tipo = req.body.tipo_membresia;
    let fecha_inicio = req.body.fecha_inicio;
    let fecha_vencimiento = req.body.fecha_vencimiento;
    let costo = req.body.costo;
    let id_cliente = req.body.id_cliente;

    let sql = 'INSERT INTO membresia (tipo_membresia, fecha_inicio, fecha_vencimiento, costo, id_clientes) VALUES(?,?,?,?,?)';
    con.query(sql,[tipo,fecha_inicio,fecha_vencimiento,costo,id_cliente], function(err,result){
        if(err) throw err;
        console.log('Registros Insertados: ' + result.affectedRows);//result.affectedRows
        return res.redirect('/');
    })
})

app.listen(4000, function(){
    return console.log('Servidor en linea en puerto 4000')
})


