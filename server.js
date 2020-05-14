const express= require('express')
const fs = require('fs')
const os = require('os')
const bodyParser= require('body-parser')
const {showDateTime} = require('./my_modules/my_modules.js')
const PORT = process.env.PORT || 2500

const app = express()

//CRUD (creadte, read, update, delete) OPERATION

//GET: Reading, POST: Creating, PUT:Updating, DELETE: Deleting

app.set('view engine', 'ejs')
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
    res.render('index')
})


app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/students', (req, res) => {
    res.render('students', {students})
})

//to read the API
app.get('/students/api', (req, res) => {
    res.send(students)
})

app.get('/students/api/:id', (req, res) => {
    const id= req.params.id
    const student = students.find(st=> st._id==id || st.firstName.toLowerCase()==id.toLowerCase()) 

    if (student){
        res.send(student) 
    }else{
        res.send('Student with this ID does not exist' ) 
    }
    
})

//to add to the API
app.post('/students', (req, res) => {
    const id=students.length+1
    req.body._id= id
    students.push(req.body)
    res.send('A student data has been created')
})

//to edit the API
app.put('/students/:id', (req, res) => {
    const id= req.params.id
    const student = students.find(st=> st._id==id || st.firstName.toLowerCase()==id.toLowerCase()) 

    if (student){
      students=students.map(st => {
       if(st._id==id){
           req.body._id= +id
           return req.body
       }  
      return st 
    })  
     res.send('A student data has been edited')
    }else{
    res.send('Student with this ID does not exist' ) 
   }
   })

app.delete('/students/:id', (req, res) => {
    const id= req.params.id
    const student = students.find(st=> st._id==id || st.firstName.toLowerCase()==id.toLowerCase()) 
    
    if (student){
    students = students.filter(st=> st._id!=id) 
    res.send('A student data has been edited')
}else{
    res.send('Student with this ID does not exist' ) 
   }

})

app.listen(PORT, () =>{
   console.log(`Server is tunning on port ${PORT}`) 
})