import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from "react-bootstrap"
import messages from '../shared/AutoDismissAlert/messages'
import { deletePatient } from '../../api/patients'

const EditPatientModal = (props) => {
    const {patient, msgAlert, show, user, handleClose} = props
    const navigate = useNavigate()

    const dischargePatient = () => {
        deletePatient(user, patient._id)
            // on success, send a success message, then navigate to index
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'patient was successfully discharged',
                    variant: 'success'
                })
            })
            .then(() => navigate('/'))
            .catch(() => {
                msgAlert({
                    heading: 'Oops...',
                    message: 'patient was not deleted.',
                    variant: 'danger'
                })
            })
    }

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    Are you sure you wish to discharge this patient?
                    <Button onClick={() => {
                        dischargePatient()
                    }}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditPatientModal