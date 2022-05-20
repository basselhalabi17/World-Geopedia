console.log("Bassel")
const express = require('express')
const Application = express()

const mysql = require('mysql2')
var cors = require('cors')

Application.use(cors())
const pool = mysql.createPool({
    host: 'db4free.net',
    port:3306,
    user: 'basselh',
    password:"q1w2e3r4t5y6",
    database: 'worldpedia',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

Application.use(express.json())

Application.use(express.urlencoded({extended : true}))


Application.get('/retrievecountry',(req,res)=>{
    pool.query("SELECT * FROM country ", function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})


Application.get('/retrievecapital',(req,res)=>{
    pool.query("SELECT * FROM capital WHERE Cap_Name!='None' AND Cap_Name!='de jure' AND capital.Cap_Name != capital.Country_CName ", function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievepresident',(req,res)=>{
    pool.query("SELECT * FROM president WHERE PName!='None' ", function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievecountryforcap',(req,res)=>{
    pool.query("SELECT Country_CName FROM capital WHERE Cap_Name!='None' AND Cap_Name!='de jure' AND capital.Cap_Name != capital.Country_CName ", function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievecountriesdrivingside/:drivingside',(req,res)=>{
    const drivingside=req.params.drivingside
    console.log(drivingside)
    pool.query(`SELECT CName FROM country WHERE Driving_Side= "${drivingside}" `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})


Application.get('/retrievelegislature/:leg',(req,res)=>{
    const leg=req.params.leg
    console.log(leg)
    pool.query(`SELECT CName FROM country WHERE Legislature= "${leg}" `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievetopGDPGlobal',(req,res)=>{
    pool.query("SELECT CName FROM country ORDER BY GDP_Purchase_Power DESC LIMIT 10 ", function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})


Application.get('/retrievetopPopGlobal',(req,res)=>{
    pool.query("SELECT CName FROM country ORDER BY Population DESC LIMIT 10 ", function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievetopAreaGlobal',(req,res)=>{
    pool.query("SELECT CName FROM country ORDER BY Area DESC LIMIT 10 ", function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievetopDensityGlobal',(req,res)=>{
    pool.query("SELECT CName FROM country ORDER BY Population/Area DESC LIMIT 10 ", function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievetopGDPcapitaGlobal',(req,res)=>{
    pool.query("SELECT CName FROM country ORDER BY GDP_Purchase_Power/Population DESC LIMIT 10 ", function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievetopGDPContinent/:cont',(req,res)=>{
    const cont=req.params.cont
    pool.query(`SELECT CName FROM country WHERE Continent= "${cont}" ORDER BY GDP_Purchase_Power DESC LIMIT 10 `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievetoppopContinent/:cont',(req,res)=>{
    const cont=req.params.cont
    pool.query(`SELECT CName FROM country WHERE Continent= "${cont}" ORDER BY Population DESC LIMIT 10 `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievetopareaContinent/:cont',(req,res)=>{
    const cont=req.params.cont
    pool.query(`SELECT CName FROM country WHERE Continent= "${cont}" ORDER BY Area DESC LIMIT 10 `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievetopdensityContinent/:cont',(req,res)=>{
    const cont=req.params.cont
    pool.query(`SELECT CName FROM country WHERE Continent= "${cont}" ORDER BY Population/Area DESC LIMIT 10 `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievetopGDPcapitaContinent/:cont',(req,res)=>{
    const cont=req.params.cont
    pool.query(`SELECT CName FROM country WHERE Continent= "${cont}" ORDER BY GDP_Purchase_Power/Population DESC LIMIT 10 `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrieveexistingreviews/:coun',(req,res)=>{
    const coun=req.params.coun
    console.log(coun)
    pool.query(`SELECT Textual_Review FROM usercountrytravels WHERE Country_CName= "${coun}" `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})



Application.get('/getcountryfromphone/:callcode',(req,res)=>{
    const callcode=req.params.callcode
    console.log(callcode)
    pool.query(`SELECT CName FROM country WHERE Calling_Code= "${callcode}"  `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})


Application.get('/adduserreview/:arrivaldate/:rating/:textreview/:counname/:username',(req,res)=>{
    const arrivaldate=req.params.arrivaldate
    const rating= req.params.rating
    const t = req.params.textreview
    const c = req.params.counname
    const u = req.params.username
   
    pool.query(`INSERT INTO usercountrytravels (Arrival_Travel_Date,rating,Textual_Review,Country_CName,User_username) Values("${arrivaldate}",${rating},"${t}","${c}","${u}")  `, function(err, rows, fields) {
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/checkuser/:username',(req,res)=>{
    const u = req.params.username
    
    pool.query(`SELECT * FROM users where Username="${u}"  `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/adduser/:username/:email/:gender/:brithdate',(req,res)=>{
    const u = req.params.username
    const a = req.params.email
    const b = req.params.gender
    const c= req.params.brithdate
   
    pool.query(`INSERT INTO users (Username,Email_Address,Gender,Birthdate) Values("${u}","${a}","${b}","${c}")  `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/checkmail/:mail',(req,res)=>{
    const m = req.params.mail
    pool.query(`SELECT * FROM users where Email_Address="${m}"  `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrieveallusers',(req,res)=>{
    
    pool.query(`SELECT * FROM users `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

Application.get('/retrievealluserstravels',(req,res)=>{
    
    pool.query(`SELECT * FROM usercountrytravels `, function(err, rows, fields) {
        // Connection is automatically released when query resolves
    console.log(rows)   
    res.send(rows)
    })
})

const port = 2000
Application.listen(port, () =>{
    console.log("Bassel")
})

