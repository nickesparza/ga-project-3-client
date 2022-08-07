import PatientIndex from "./patients/PatientIndex"
import doctorSmilePic from "../imgs/doctorsmile.jpeg"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const { msgAlert} = props
    const { user } = props

	return (
		
		<div className="homeContainerMiddleBody">
			<div className="image-doctor">
				<image src={doctorSmilePic}></image>
			</div>

			<h2 className="h2themedics">The Medics</h2>

			<h3>See the Patients</h3>
			{
                user
                ?
                <PatientIndex 
                    msgAlert= { msgAlert }
                    user={user}
                />
                :
                <p>log in to see patients.</p>
            }

			<footer className="footerHomeBody">
					<h3>
						ola.
					</h3>
			</footer>
			

		</div>
			


		
	)
}

export default Home
