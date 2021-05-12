
import * as actionTypes from '../actions/actionTypes'

export const userLogin = (token) => {
    return {
        type: actionTypes.LOGIN,
        payload: token
    }
}

export const userLogout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}