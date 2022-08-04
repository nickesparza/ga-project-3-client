import PatientForm from "../shared/PatientForm"
import { createPatient } from "../../api/patients"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import messages from "../shared/AutoDismissAlert/messages"

const NewPatient = (props) => {
    console.log('these are the props in NewPatient', props)
    const { msgAlert, user } = props
    const navigate = useNavigate()
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        bloodType: '',
        emergencyContact: '',
        preCon: '',
        currCon: '',
        treatment: '',
        comments: ''
    })

        const handleChange = (e) => {
            setPatient(prevPatient => {
                let value = e.target.value
                const name = e.target.name

                const updatedPatient = {
                    [name]: value
                }
    
                return {
                    ...prevPatient,
                    ...updatedPatient
                }
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            createPatient(user, patient)
                // send a success message
                // navigate to newly created patient
                .then(res => navigate(`/patients/${res.data.patient.id}`))
                .then(() => {
                    msgAlert({
                        heading: 'Success',
                        message: 'Patient Created',
                        variant: 'success'
                    })
                })
        }

        return (
                <PatientForm 
                    patient={patient}
                    heading="Intake New Patient"
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
        )

}

export default NewPatient