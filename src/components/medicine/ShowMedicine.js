import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditToyModal from './EditToyModal'
import { deleteToy } from '../../api/toys'

const ShowToy = (props) => {
    // destructure some props
    const { toy, pet, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit toy modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)

    // this will set a color depending on the toy's condition
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor:'#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor:'#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor:'#ff9aa2'})
        }
    }

    // calls this to destroy a toy
    const destroyToy = () => {
        deleteToy(user, pet._id, toy._id)
            .then(() => 
                msgAlert({
                    heading: 'Toy Deleted',
                    message: 'Bye bye toy!',
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
            <Card className="m-2" style={setBgCondition(toy.condition)}>
                <Card.Header>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small><br/>
                    <small>
                        {toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {toy.condition}</small><br/>
                    {
                        user && user._id === pet.owner._id
                        ?
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit Toy
                            </Button>
                            <Button 
                                onClick={() => destroyToy()} 
                                variant="danger"
                            >
                                Delete Toy
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditToyModal
                user={user}
                pet={pet}
                toy={toy}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowToy