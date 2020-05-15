const Student = require('../models/Student')

const showHome = (req, res) => {res.render('pages/index')}

const showAbout = (req, res) => {res.render('pages/about')}

const showContact = (req, res) => {res.render('pages/contact')}

const showStudents = (req, res) => {
    Student.find({}, (err, students)=> {err ? res.status(404).send('Not found') : res.render('pages/students', {students})})
}

const showStudent = (req, res) => {
    const id= req.params.id
    Student.findOne({_id: id}, (err, student)=> {err ? res.status(404).send('Not found') : res.render('pages/student', {student})})
}

const showAdd = (req, res) => {res.render('pages/add')}

const showEdit = (req, res) => {
    const id= req.params.id
    Student.findOne({_id: id}, (err, student)=> {err ? res.status(404).send('Not found') :  res.render('pages/edit', {student})})
}

const getAllStudents = (req,res) => {
    Student.find({}, (err, students)=> {err ? res.status(404).send('Not found') : res.json(students)})
}

const getSingleStudent = (req,res) => {
    const id= req.params.id
    Student.findOne({_id: id}, (err, student)=> {err ? res.status(404).send('Not found') : res.json(student)})
}

const addStudent = (req,res) => {
    req.body.skills = req.body.skills.split(',')
    const newStudent = new Student(req.body)
    newStudent.save(err => {err ? res.status(404).send('Not found') : res.redirect('/students') }) 
}

const editStudent = (req, res) => {
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
}

const deleteStudent = (req, res) => {
    const id= req.params.id
    Student.deleteOne({_id: id}, err=> {
    err ? res.status(404).send('Not found') : res.redirect('/students')
    })
}

module.exports = {
    showHome:showHome,
    showAbout:showAbout,
    showContact:showContact,
    showStudents: showStudents,
    showStudent: showStudent,
    showAdd:showAdd,
    showEdit:showEdit,
    getAllStudents:getAllStudents,
    getSingleStudent:getSingleStudent,
    addStudent:addStudent,
    editStudent:editStudent,
    deleteStudent:deleteStudent
}