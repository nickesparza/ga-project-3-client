import PatientIndex from "./patients/PatientIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const { msgAlert} = props
    const { user } = props

	return (
		
		<div className="homeContainerMiddleBody">
				<div className="body-home-page">

				
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

						

				</div>
		</div>
			


		
	)
}

export default Home
