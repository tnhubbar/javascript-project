const BASE_URL = "http://localhost:3000"
const randomizationForm = document.querySelector('#randomization-form')
let statArea = document.querySelector('.stats')

document.addEventListener('DOMContentLoaded', () => {

})

//Stats Request Get request
function getPatients(){
    //Get all the patients
    statArea.innerHTML = ""
    fetch(BASE_URL+"/patients")
    .then(resp => resp.json())
    .then(patients => { 
        let numbers = patients.length 
        statArea.innerHTML += `You have randomized ${numbers} patients to Treatment A`
    })
};

//Post fetch to send data to the database
function sendData(newPtData){
    let configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        }, 
        body: JSON.stringify(newPtData)}
    
    fetch("http://localhost:3000/patients", configObj)
    .then(resp => resp.json())
    .then(enteredData => {
        //do something with entered data(display new pt id)
        statArea.innerHTML += `You've have been randomized. You patient id is ${enteredData.id}!`
        console.log(enteredData)
    })
    .catch(function(error){
        document.body.innerHTML = error.message
    })
};


randomizationForm.addEventListener('submit', event => {
    event.preventDefault()
    let ptData = {
        name: document.getElementById("name").value , 
        dob: document.getElementById("dob").value , 
        gender: document.getElementById("gender").value , 
        factors: document.getElementById("risk-factors").value , 
        effects: document.getElementById("side-effects").value, 
        treatment_id: Math.round(Math.random() + 1)
    }
    sendData(ptData)
    let form = document.getElementById("create")
    form.reset()
})