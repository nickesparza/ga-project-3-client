import PatientIndex from "./patients/PatientIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		
		<div className="homeContainerMiddleBody">
			<h2 className="h2themedics">The Medics</h2>

			<h3>See the Patients</h3>
			<PatientIndex />

			<footer className="footerHomeBody">
					<h3>
						ola.
					</h3>
			</footer>
			

		</div>
			


		
	)
}

export default Home
