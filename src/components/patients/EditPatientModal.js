import React, {useState} from 'react'
import { Modal } from "react-bootstrap"
import messages from '../shared/AutoDismissAlert/messages'
import PatientForm from "../shared/PatientForm"

const EditPatientModal = (props) => {
    const {msgAlert, user, show, handleClose, updatePatient, triggerRefresh} = props

    const [patient, setPatient] = useState(props.patient)
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
        updatePatient(user, patient)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Patient has been edited.',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Patient was not edited.',
                    variant: 'danger'
                })
            })
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