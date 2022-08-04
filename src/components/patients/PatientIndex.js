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

    useEffect(() => {

        getAllPatients()
        .then(res => setPatients(res.data.patients))
        //console.log('use effects work')
        .catch(err => console.log(err))

    }, [])

    // if (error) {
    //     return <p>Error!</p>
    // }

    if(!patients) {
        // return <p>Loading...</p>
        return <LoadingScreen />

    } else if(patients.length === 0 ){
        return <p>No patients yet...Lets Add some.</p>
    }

    const patientCards = patients.map(patient => (
        <Card>
            <Card.Header>{  patient.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/patients/${patient.id}`}>View { patient.name}</Link> 
                </Card.Text>
            </Card.Body>
        </Card>
        ))

        return(
            <>
            { patientCards}
            </>
        )



    

    // return <h1>This is Patients Index</h1>
}

export default PatientIndex