import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'

const PatientForm = (props) => {
    const { patient, heading, handleChange, handleSubmit } = props

    return (
        <Container className='justify-content-center'>
            <h1>{heading}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor='name'>Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='name'
                        value={patient.name}
                        placeholder='Enter name'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='age'>Age</Form.Label>
                    <Form.Control
                        required
                        name='age'
                        value={patient.age}
                        type='number'
                        placeholder='Enter age'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='bloodType'>Blood Type</Form.Label>
                    <Form.Select
                        required
                        name='bloodType'
                        value={patient.bloodType}
                        defaultValue={patient.bloodType}
                        onChange={handleChange}
                    >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </Form.Select>
                    <Form.Label htmlFor='emergencyContact'>Emergency Contact Tel.</Form.Label>
                    <Form.Control
                        name='emergencyContact'
                        value={patient.emergencyContact}
                        type='text'
                        placeholder='Enter telephone number'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='preCon'>Pre-existing Conditions</Form.Label>
                    <Form.Control
                        name='preCon'
                        value={patient.preCon}
                        type='text'
                        placeholder='Describe any conditions'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='currCon'>Current Condition</Form.Label>
                    <Form.Select
                        required
                        name='currCon'
                        value={patient.currCon}
                        defaultValue={patient.currCon}
                        onChange={handleChange}
                    >
                        <option value="stable">stable</option>
                        <option value="serious">serious</option>
                        <option value="critical">critical</option>
                    </Form.Select>
                    <Form.Label htmlFor='treatment'>Treatment</Form.Label>
                    <Form.Control
                        name='treatment'
                        value={patient.treatment}
                        type='text'
                        placeholder='Describe treatment plan'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='comments'>Comments</Form.Label>
                    <Form.Control
                        name='comments'
                        value={patient.comments}
                        type='text'
                        placeholder='Describe comments'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Create
                </Button>
            </Form>
        </Container>
    )
}

export default PatientForm