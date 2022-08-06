import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// // useParams will allow us to see our parameters
// // useNavigate will allow us to navigate to a specific page
import { Container, Card, Button } from 'react-bootstrap'

//EXTRA THINGS TO THE SHOW PATIENT
import LoadingScreen from '../shared/LoadingScreen'
import EditPatientModal from './EditPatientModal'
import DeletePatientModal from './DeletePatientModal'
import { getOnePatient, attendPatient } from '../../api/patients'
import { updatePatient } from '../../api/patients'


//IMPORTING STYLES 
import imgProfile from '../../imgs/profile.jpeg'

//FLEX GRID
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';



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
                  {/*Patient CARD  */}
                    {/* style={{width: '30%',  margin: 5}} */}
                <div className='patient-treatment-cards'>
                    <div className='holdCards'>

                
                     {/*PATIENT CARD  */}
                    <Card className='cards-patient-treat patient-card' >
                        <div className='div-profile-IMG'>
                        <img className='image' style={{width: '45%',margin: 5}} src={imgProfile} ></img>

                        </div>
                           
                            <Card.Header><h2 >{ patient.name }</h2></Card.Header>
                            <Card.Body>
                                <p ><p className='p-info'>Age: </p>{patient.age}</p>
                                <p> <p className='p-info'>Blood Type:</p>  {patient.bloodType}</p>
                                <p> <p className='p-info'>Urgent Contact:</p>  {patient.emergencyContact}</p>
                                <p> <p className='p-info'>PreCon:</p>  {patient.preCon}</p>
                                <p> <p className='p-info'>CurrCon:</p>  {patient.currCon}</p>
                                <p> <p className='p-info'>Doctors:</p>  {doctorList}</p>
                                <p> <p className='p-info'>Treatment:</p>  {patient.treatment}</p>
                                <p> <p className='p-info'>Comments:</p>  {patient.comments}</p>
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
                  
               
                    <Card className='cards-patient-treat treatment-card' >
                        {/* <div  class="col" > */}

                        
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
                        {/* </div> */}
                    </Card>
                   {/* </div> */}

                   </div>
                    

                </div>

        {/* </div> */}
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