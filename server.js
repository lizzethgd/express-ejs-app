require('dotenv').config()
const express= require('express')
const fs = require('fs')
const os = require('os')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const {showDateTime} = require('./my_modules/my_modules.js')
const Student = require('./models/Student')
const PORT = process.env.PORT || 2500
const Router = require('./routes/routes')

const app = express()

//CRUD (creadte, read, update, delete) OPERATION
//GET: Reading, POST: Creating, PUT:Updating, DELETE: Deleting

//We are setting our view engine, ejs
app.set('view engine', 'ejs')


//Serving static files in express
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//connect mongodb with the server
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  }, (err)=> {
    if (err) return console.log(err)
    console.log('The server is conncected to MongoDB database')
})

app.use('/', Router)

/*
app.get('/', (req, res) => {
    res.render('pages/index')
})


app.get('/about', (req, res) => {
    res.render('pages/about')
})

app.get('/contact', (req, res) => {
    res.render('pages/contact')
})

app.get('/students', (req, res) => {
    Student.find({}, (err, students)=> {
    err ? res.status(404).send('Not found') : res.render('pages/students', {students})
    })
})


app.get('/students/:id', (req, res) => {
    const id= req.params.id
    Student.findOne({_id: id}, (err, student)=> {
    err ? res.status(404).send('Not found') : res.render('pages/student', {student})
    })
})


app.get('/add', (req, res) => {
    res.render('pages/add')
})

app.get('/student/:id/edit', (req, res) => {
    const id = req.params.id
    Student.findOne({_id: id}, (err, student)=> {
    err ? res.status(404).send('Not found') :  res.render('pages/edit', {student})
    })
})

//to read all the data form the API
app.get('/api/v.1.0/students/', (req, res) => {
    Student.find({}, (err, students)=> {
        err ? res.status(404).send('Not found') : res.json(students)
        })
    
})

//to read on single student from the API
app.get('/api/v.1.0/students/:id', (req, res) => {
    const id= req.params.id
    Student.findOne({_id: id}, (err, student)=> {
        err ? res.status(404).send('Not found') : res.json(student)    
        })
})

//to add data to the API, adding student route
app.post('/api/v.1.0/students/', (req, res) => {
    req.body.skills = req.body.skills.split(',')
    const newStudent = new Student(req.body)
    newStudent.save(err =>{
    err ? res.status(404).send('Not found') : res.redirect('/students')   
    }) 
})

//to edit a data of the API, editing path
app.post('/api/v.1.0/students/:id/edit', (req, res) => {
    const id= req.params.id
    req.body.skills = req.body.skills.split(',')
    const {firstName, lastName, age, country, bio, skills} = req.body
    Student.findOne({_id: id}, (err, student)=> {
        if(err) return res.status(404)
        student.firstName= firstName
        student.lastName= lastName
        student.age= age
        student.country = country
        student.bio = bio
        student.skills = skills
        student.save(err =>{ err ? res.status(404).send('Not found') : res.redirect('/students') })  
    })
})

//get to delete a data from the API
app.get('/api/v.1.0/students/:id/delete', (req, res) => {
    const id= req.params.id
    Student.deleteOne({_id: id}, (err, student)=> {
    err ? res.status(404).send('Not found') : res.redirect('/students')
    })
})
*/

//Middle ware
app.use((req,res, next)=>{
    const user= os.hostname
    const page= req.url
    const date = showDateTime()
    const content = `${user} access ${page} page on ${date}\n`
    
    fs.appendFile('log.txt', content, err => {
       if (err) throw err
       console.log('content has been saved')
    })
    //must thing to do
    next()
    })
    

app.listen(PORT, () =>{
   console.log(`Server is tunning on port ${PORT}`) 
})