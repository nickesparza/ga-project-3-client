import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllPatients = () => {
    return axios(`${apiUrl}/patients`)
}