import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllPatients = (user) => {
    return axios({
		url: apiUrl + '/patients',
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}

// READ => SHOW
export const getOnePatient = (user, id) => {
    // return axios(`${apiUrl}/patients/${id}`)
    return axios({
        url: apiUrl + `/patients/${id}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    
    })
}

// // READ => SHOW
// export const getOnePatient = (id) => {
//     return axios(`${apiUrl}/patients/${id}`)
//     // return axios({
//     //     url: apiUrl + `/patients/${id}`,
//     //     method: 'GET',
//     //     headers: {
//     //         Authorization: `Token token=${user.token}`
//     //     }
    
//     // })
// }

