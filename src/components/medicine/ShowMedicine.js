import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditMedicineModal from './EditMedicineModal'
import { deleteToy } from '../../api/medicines'

const ShowMedicine = (props) => {
    // destructure some props
    const { medicine, patient, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit toy modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)

    // this will set a color depending on the toy's condition
    // const setBgCondition = (cond) => {
    //     if (cond === 'new') {
    //         return({width: '18rem', backgroundColor:'#b5ead7'})
    //     } else if (cond === 'used') {
    //         return({width: '18rem', backgroundColor:'#ffdac1'})
    //     } else {
    //         return({width: '18rem', backgroundColor:'#ff9aa2'})
    //     }
    // }

    // calls this to destroy a medicine
    const destroyMedicine = () => {
        deleteMedicine(user, patient._id, medicine._id)
            .then(() => 
                msgAlert({
                    heading: 'Medication Deleted',
                    message: 'Bye bye med!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            <Card>
                <Card.Header>{medicine.name}</Card.Header>
                <Card.Body>
                    <small>{medicine.dosage}</small><br/>
                    {/* <small>
                        {toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small> */}
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {medicine.duration}</small><br/>
                    {
                        user && user._id === patient.owner._id
                        ?
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit Medicine
                            </Button>
                            <Button 
                                onClick={() => destroyMedicine()} 
                                variant="danger"
                            >
                                Delete Medicine
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditMedicineModal
                user={user}
                patient={patient}
                medicine={medicine}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowMedicine