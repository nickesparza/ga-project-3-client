import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
// // useParams will allow us to see our parameters
// // useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOnePatient } from '../../api/patients'
// import messages from '../shared/AutoDismissAlert/messages'
// // import EditPetModal from './EditPetModal'
// // import NewToyModal from '../toys/NewToyModal'
// // import ShowToy from '../toys/ShowToy'

const ShowPatient = (props) => {
    //just on  Patient
    const[patient, setPatient] = useState(null) //null because dont wanna show nothing now

    const {user} =props

    const { id } = useParams()
    //get the i value from our route paramaters

    useEffect(() => {

        getOnePatient(user, id)
        .then(res => setPatient(res.data.patient))
        // .catch(err)

    }, [])

    console.log(patient)

    if(!patient) {
        return <LoadingScreen  />
    }

   // console.log('params in show Patient', params)
    return (
        <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', marginTop:10}}>

        <Card style={{width: '30%',  margin: 5}}>
            <Card.Header><h2>{ patient.name }</h2></Card.Header>
            <Card.Body>
                <p>Age: {patient.age}</p>
                <p>Blood Type: {patient.bloodType}</p>
                <p>Urgent Contact: {patient.emergencyContact}</p>
                <p>preCon: {patient.preCon}</p>
                <p>currCon: {patient.currCon}</p>
                <p>treatment: {patient.treatment}</p>
                <p>comments: {patient.comments}</p>
            </Card.Body>
        </Card>
        <Card style={{width: '30%',  margin: 5}}>
            <Card.Header><h4>Treatment</h4></Card.Header>
            <Card.Body>
             <p>this is The treatment for {patient.name }</p>
                
               
            </Card.Body>
        </Card>
        
        </div>
        
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