const BASE_URL = "http://localhost:3000"
const randomizationForm = document.querySelector('#randomization-form')
let statArea = document.querySelector('.stats')
let confirmationArea = document.querySelector('.confirmation')

document.addEventListener('DOMContentLoaded', () => {



//Fetch request to get all patients
function listPatients(){
    //Get all the patients
    statArea.innerHTML = ""
    confirmationArea.style.display = "none"
    fetch(BASE_URL+"/patients")
    .then(resp => resp.json())
    .then(patients => { 
            patients.forEach((person, index, array) => {
                let patient = new Patient(person.id, person.name, person.dob, person.gender, person.factors, person.effects, person.treatment.id, person.treatment.name)
                patient.renderPatient()
            })
        
    });

};

//fetch request to delete user 
function deletePatient(pid){
    fetch(BASE_URL+`/patients/${pid}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => {
        statArea.innerHTML = `</br> <div> Patient ${data.id} has been deleted. </div></br>`
    })
}

//Statistics HTTP Get fetch Request to get statistics of each treatment 
function getPatients(){
    //Get all the patients
    confirmationArea.style.display = "block"
    let treatmentArray = []
    let personArray = []
    statArea.innerHTML = ""
    fetch(BASE_URL+"/patients")
    .then(resp => resp.json())
    .then(patients => {
        patients.forEach((person, index, array) => {
            let treatment = new Treatment(person.treatment.id, person.treatment.name)
            treatmentArray.push(treatment)
            personArray.push(person)
        })
        let treatmentA = treatmentArray.filter(function(treatment){ 
            return treatment.name === "Treatment A"})
        let treatmentB = treatmentArray.filter(function(treatment){ 
            return treatment.name === "Treatment B"})
        let treatmentAPeople = personArray.filter(function(person){
            return person.treatment.name == "Treatment A"})
        let treatmentBPeople = personArray.filter(function(person){
            return person.treatment.name == "Treatment B"
        })

        confirmationArea.innerHTML = `You have randomized ${treatmentA.length}  patients to <a  id="treatmentA" href="" > Treatment A </a> </br> And you have randomized  ${treatmentB.length} patients to <a  id="treatmentB" href="" > Treatment B. </a>`
        
        let treatmentAButton = document.getElementById("treatmentA")
        treatmentAButton.addEventListener("click", event => {
            event.preventDefault()
            confirmationArea.innerHTML = ` <div style="text-align:center;" ><b>The below Patients are on Treatment A: </b></br></br> 
            ${treatmentAPeople.map((person) => ` Patient ID:   ${person.id}</br>`).join('')}
            </div>`
        })


        let treatmentBButton = document.getElementById("treatmentB")
        treatmentBButton.addEventListener("click", event => {
            event.preventDefault()
            confirmationArea.innerHTML = ` <div style="text-align:center;" ><b> The below Patients are on Treatment B: </b></br></br> 
            ${treatmentBPeople.map((person) => ` Patient ID:   ${person.id}</br></br>`).join('')}
            </div>`
        })
        

    })
};


//add listener to statistics link 
let statistics = document.getElementById("stats")
statistics.addEventListener("click", event => {
    event.preventDefault()
    getPatients()
})

//add event listener to all patients link
let allPatients = document.getElementById("all-patients")
    allPatients.addEventListener("click", event => {
        event.preventDefault()
        listPatients() 
    })



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
        let patient = new Patient(enteredData.id, enteredData.name, enteredData.dob, enteredData.gender, enteredData.factors, enteredData.effects,  enteredData.treatment.id, enteredData.treatment.name)
                patient.renderTreatment()
    })
    .catch(function(error){
        document.body.innerHTML = error.message
    })
};

// randomizing patient and submitting data. 
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
});


// adding event listener to delete patients
let deleteButtonArea = document.querySelector(".stats")
deleteButtonArea.addEventListener('click', event => {
    event.preventDefault()
    let number 
    if (event.target.type == "button") 
    number = event.target.id 
    deletePatient(number)
    {event.target.parentNode.remove()}
})


}); 

//When I hit the stats button we want a list of all patients on that current treatment. And Sorted by creation date. //