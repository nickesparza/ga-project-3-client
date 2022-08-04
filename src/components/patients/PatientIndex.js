import { 
    useState, 
    useEffect 
} from 'react'
// import { propTypes } from 'react-bootstrap/esm/Image'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllPatients } from '../../api/patients'

// import messages from '../shared/AutoDismissAlert/messages'

const PatientIndex = (props) => {
    const [patients, setPatients] = useState(null)
    const { user } = props
    console.log('user in PatientIndex', user)
    useEffect(() => {
        console.log('useEffect has run')
        if (user) {
            getAllPatients(user)
            // .then(res => console.log(res))
            .then(res => setPatients(res.data.patients))
            //console.log('use effects work')
            .catch(err => console.log(err))
        // if there is no user, console log this message
        } else {
            setPatients([])
            console.log('not logged in', patients)
        }
    }, [])

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
    // if there is no user, tell them to log in
    } else if (!user) {
        return <p>please log in to see patients.</p>
    }

    const patientCards = patients.map(patient => (
        <Card key={patient._id}>
            <Card.Header>{ patient.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/patients/${patient.id}`}>View { patient.name}</Link> 
                </Card.Text>
            </Card.Body>
        </Card>
        ))

        return(
            <>
            { patientCards }
            </>
        )



    

    // return <h1>This is Patients Index</h1>
}

export default PatientIndex