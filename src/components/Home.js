import PatientIndex from "./patients/PatientIndex"
import doctorPicture from "../imgs/doctorsmile.jpeg"
import { Container } from "react-bootstrap"
 
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const { msgAlert} = props
    const { user } = props

	return (
		
		<div className="homeContainerMiddleBody">
				<div className="body-home-page">
					<Container >
						<figure className="position-relative" >
							<div className="img-dr-control">
								<img className="img-smile-doctor img-fluid position-relative position-fixed" src={doctorPicture} />
							</div>
								
							<figcaption >
								<div >
									<h2 className="h2themedics ">The Medics</h2>
								</div>

								
								<h3 >See the Patients</h3>
								<div className="controlOnlyCards">
								{
									user
									?
									
									<PatientIndex 
										
										msgAlert= { msgAlert }
										user={user}
									/>
									
									
									:
									
									<p className="styling-Texts ">Log in to see patients...</p>
									
									
								}
								</div>
								

							</figcaption>

						</figure>


					</Container>

						

				</div>
		</div>
			


		
	)
}

export default Home
