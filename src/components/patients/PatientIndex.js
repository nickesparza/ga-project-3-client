import { 
    useState, 
    useEffect 
} from 'react'
// import { propTypes } from 'react-bootstrap/esm/Image'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllPatients } from '../../api/patients'

import messages from '../shared/AutoDismissAlert/messages'

//IMPORTING STYLES 
import imgProfile from '../../imgs/profile.jpeg'


// STYLE FOR CARDs
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
   
    
}

/// PATIENTS LIST 
const PatientIndex = (props) => {
    const [patients, setPatients] = useState(null)
    const { msgAlert } = props
    const { user } = props
    const navigate = useNavigate()
    console.log('user in PatientIndex', user)
    useEffect(() => {
        console.log('useEffect has run')
        if (user) {
            getAllPatients(user)
            // .then(res => console.log(res))
            .then(res => setPatients(res.data.patients))
            //console.log('use effects work')
            .catch(err => {
                msgAlert ({
                heading: 'Error Getting Patients',
                message: messages.getPatientsFailure,
                variant: 'danger',
            })})
        // if there is no user, console log this message.. no showing the patients....
        } else {
            setPatients([])
        }
    }, [user])

    // if (error) {
    //     return <p>Error!</p>
    // }

    // this is fine as the loading screen condition
    if(!patients) {
        // return <p>Loading...</p>
        return <LoadingScreen />
    // if the patient list is 0, but a user exists, show them that they have the ability to add patients
    } else if (patients.length === 0 && user ) {
        return <p>No patients yet...Lets Add some.</p>
    }
    // if there is no user, tell them to log in

    const patientCards = patients.map(patient => (
       

        
            <Card style={{width: '30%',  margin: 5}} key={patient._id}>
                <div className='div-profile-IMG'>
                            <img className='image' style={{width: '45%',margin: 5}} src={imgProfile} ></img>
                </div>
                <Card.Header>{ patient.name }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/patients/${patient._id}`}><p className='p-info'  >View:</p>  {patient.name}</Link> 
                    </Card.Text>
                
                </Card.Body>
            </Card>
       
        ))


        //SHOWING PATIENT CARDS ON BODY
        return(
            <div style={cardContainerStyle}>
            { patientCards }
            </div>
        )



    

    // return <h1>This is Patients Index</h1>
}





export default PatientIndex