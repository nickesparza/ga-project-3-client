import { useEffect, useState } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// // useParams will allow us to see our parameters
// // useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import EditPatientModal from './EditPatientModal'
import DeletePatientModal from './DeletePatientModal'
import { getOnePatient, attendPatient } from '../../api/patients'
import { updatePatient } from '../../api/patients'

// import messages from '../shared/AutoDismissAlert/messages'
// // import EditPetModal from './EditPetModal'
// // import NewToyModal from '../toys/NewToyModal'
// // import ShowToy from '../toys/ShowToy'

const ShowPatient = (props) => {
    //just on  Patient
    const[patient, setPatient] = useState(null) //null because dont wanna show nothing now
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [treatmentModalShow, setTreatmentModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const {user, msgAlert} = props

    const { id } = useParams()
    const navigate = useNavigate()
    //get the i value from our route paramaters

    useEffect(() => {
        if (user) {
            getOnePatient(user, id)
            .then(res => setPatient(res.data.patient))
            // .catch(err)
        } else {
            navigate('/sign-in')
        }
    }, [updated])

    if(!patient) {
        return <LoadingScreen  />
    }

    const doctorList = patient.doctors.map(doctor => {
        return doctor.email
    })

    const toggleDoctor = () => {
        attendPatient(user, patient)
            .then(setUpdated(prev => !prev))
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Patient was not edited.',
                    variant: 'danger'
                })
            })
    }
    // console.log('params in show Patient', params)
    return (
        <>
            <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', marginTop:10}}>
                <Card style={{width: '30%',  margin: 5}}>
                    <Card.Header><h2>{ patient.name }</h2></Card.Header>
                    <Card.Body>
                        <p>Age: {patient.age}</p>
                        <p>Blood Type: {patient.bloodType}</p>
                        <p>Urgent Contact: {patient.emergencyContact}</p>
                        <p>preCon: {patient.preCon}</p>
                        <p>currCon: {patient.currCon}</p>
                        <p>doctors: {doctorList}</p>
                        <p>treatment: {patient.treatment}</p>
                        <p>comments: {patient.comments}</p>
                    </Card.Body>
                    <Card.Footer>
                        {
                            <Button size='sm' className='mx-2' variant='info' onClick={() => setEditModalShow(true)}>
                                Edit Patient
                            </Button>
                        }
                        {
                            <Button size='sm' className='mx-2' variant='outline-danger' onClick={() => setDeleteModalShow(true)}>
                                Discharge Patient
                            </Button>
                        }
                    </Card.Footer>
                </Card>
                <Card style={{width: '30%',  margin: 5}}>
                    <Card.Header><h4>Treatment</h4></Card.Header>
                    <Card.Body>
                        <p>this is The treatment for {patient.name }</p>
                    </Card.Body>
                    <Card.Footer>
                        <Button size='sm' className='mx-2' variant='info' onClick={() => {
                            setEditModalShow(true)
                            setTreatmentModalShow(true)
                            }}>
                            Set Treatment
                        </Button>
                        <Button size='sm' className='mx-2' variant='success' onClick={toggleDoctor}>
                            Attend patient
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
            <EditPatientModal
                // modal needs patient info to populate fields
                patient={patient}
                treatmentModalShow={treatmentModalShow}
                // needs user in order to validate in the backend update function
                user={user}
                // msgAlert shows the success/fail messages
                msgAlert={msgAlert}
                // this sets the visibility of the modal when the relevant button is clicked
                show={editModalShow}
                // this is a function passed in from props that will run the patch route
                updatePatient={updatePatient}
                // this updates the state to trigger another useEvent pull of data
                triggerRefresh={() => setUpdated(prev => !prev)}
                // this closes the modal when the submit button is pressed
                handleClose={() => {
                    setEditModalShow(false)
                    setTreatmentModalShow(false)
                }} 
            />
            <DeletePatientModal
                patient={patient}
                user={user}
                msgAlert={msgAlert}
                show={deleteModalShow}
                handleClose={() => setDeleteModalShow(false)}
            />
        </>
    )
}

export default ShowPatient




// // We need to get the pet's id from the parameters
// // Then we need to make a request to the api
// // Then we need to display the results in this component

// // we'll use a style object to lay out the toy cards
// const cardContainerLayout = {
//     display: 'flex',
//     justifyContent: 'center',
//     flexFlow: 'row wrap'
// }