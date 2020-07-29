const BASE_URL = "http://localhost:3000"
const randomizationForm = document.querySelector('#randomization-form')

document.addEventListener('DOMContentLoaded', () => {

})

//Stats Request Get request
function getPatients(){
    //Get all the patients
    let statArea = document.querySelector('.stats')
    statArea.innerHTML = ""
    fetch(BASE_URL+"/patients")
    .then(resp => resp.json())
    .then(patients => { 
        let numbers = patients.length 
        statArea.innerHTML += `You have randomized ${numbers} patients to Treatment A`
    })
};

//Post fetch to send data to the database
function sendData(data){
    let formData = {data coming from form}
    let configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        }, 
        body: JSON.stringify(formData)}
    
    fetch("http://localhost:3000/patients", configObj)
    .then(resp => resp.json())
    .then(enteredData => {
        //do something with entered data(display new pt id)
    })
    .catch(function(error){
        document.body.innerHTML = error.message
    })
};
