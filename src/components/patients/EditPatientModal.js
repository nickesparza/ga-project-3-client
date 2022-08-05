import React, {useState} from 'react'
import { Modal } from "react-bootstrap"
import PatientForm from "../shared/PatientForm"

const EditPatientModal = (props) => {
    const {msgAlert, user, show, handleClose, updatePet, triggerRefresh} = props

    const [patient, setPatient] = useState(props.patient)
    const handleChange = (e) => {
        console.log(`a change was made`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit was pressed')
    }

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <PatientForm patient={patient} heading="Update Patient" handleChange={handleChange} handleSubmit={handleSubmit}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditPatientModal