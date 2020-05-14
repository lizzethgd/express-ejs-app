const express= require('express')
const fs = require('fs')
const os = require('os')
const bodyParser= require('body-parser')
const {showDateTime} = require('./my_modules/my_modules.js')
const PORT = process.env.PORT || 2500

const app = express()

//CRUD (creadte, read, update, delete) OPERATION

//GET: Reading, POST: Creating, PUT:Updating, DELETE: Deleting


//Middle ware

//We are setting our view engine, ejs
app.set('view engine', 'ejs')

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

//Serving static files in express
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let students = [ 
    {
     _id: 1,
     firstName: 'Asabeneh',
     lastName: 'Yetayeh',
     age: 38,
     country: 'Etiophia',
     skills: ['HTML','CSS','JS', 'Node']
    },
    {
     _id: 2,
     firstName: 'Heidi',
     lastName: 'Salamanca',
     age: 30,
     country: 'Peru',
     skills: ['HTML','CSS','React','Redux']
    },
    {
     _id: 3,
     firstName: 'Elizabeth',
     lastName: 'Salamanca',
     age: 32,
     country: 'Peru',
     skills: ['HTML','CSS','React','Python']
    },
    {
     _id: 4,
     firstName: 'Maricarmen',
     lastName: 'Marin',
     age: 42,
     country: 'Spain',
     skills: ['HTML','CSS','React','Python']
    }
]

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
    res.render('pages/students', {students})
})

app.get('/students/:id', (req, res) => {
    const id= req.params.id
    const student = students.find(st => st._id==id)
    res.render('pages/student', {student})
})

app.get('/add', (req, res) => {
    res.render('pages/add')
})

app.get('/student/:id/edit', (req, res) => {
    const id = req.params.id
    const student = students.find(st=> st._id==id) 
    res.render('pages/edit', {student})
})

//to read all the data form the API
app.get('/api/v.1.0/students/', (req, res) => {
    res.send(students)
})

//to read on single student from the API
app.get('/api/v.1.0/students/:id', (req, res) => {
    const id= req.params.id
    const student = students.find(st=> st._id==id || st.firstName.toLowerCase()==id.toLowerCase()) 
    res.send(student)    
})

//to add data to the API, adding student route
app.post('/api/v.1.0/students/', (req, res) => {
    const id=students.length+1
    req.body.skills = req.body.skills.split(',')
    req.body._id= id
    students.push(req.body)
    res.redirect('/students')
})

//to edit a data of the API, editing path
app.post('/api/v.1.0/students/:id/edit', (req, res) => {
    const id= req.params.id
    students=students.map(st => {
        if(st._id==id){
           req.body.skills = req.body.skills.split(',')
           req.body._id= +id
           return req.body
       }  
        return st 
    })  
    res.redirect('/students')
   })

//get to delete a data from the API
app.get('/api/v.1.0/students/:id/delete', (req, res) => {
    const id= req.params.id
    students = students.filter(st=> st._id!=id) 
    res.redirect('/students')
})

app.listen(PORT, () =>{
   console.log(`Server is tunning on port ${PORT}`) 
})