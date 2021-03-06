class Patient{
    constructor(id, name, dob, gender, factors, effects, treatment_id, treatmentName){
        this.id = id 
        this.name = name
        this.dob = dob 
        this.gender = gender 
        this.factors = factors
        this.effects = effects
        this.treatment_id = treatment_id
        this.treatmentName = treatmentName
        Patient.all.push(this)
    }

    //this will take the return objects from the fetch request and display. 
     renderPatient(){
        let statArea = document.querySelector('.stats')
        statArea.innerHTML += `<div id=${this.id}> Patient ID: ${this.id} <button type="button" class="button" id="${this.id}" >Withdraw/Lost to Follow Up</button></br></br></div>`
    }
    //this will render which treatment the patient is on after randomizing
    renderTreatment(){
        let statArea = document.querySelector('.stats')
        statArea.innerHTML = `You've have been randomized to ${this.treatmentName}. You patient id is ${this.id}! Please retain this id for all further study related activities.`
    }
}

Patient.all = []


