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

export const createPatient = (user, newPatient) => {
    return axios({
        url: apiUrl + '/patients',
        method: 'POST',
        headers: {
            Authorization: `Token token =${user.token}`
        },
        data: {
            newPatient
        }
    })
}