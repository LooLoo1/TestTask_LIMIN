const defaulteState = {
	user: null || JSON.parse(localStorage.getItem("user"))
}

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

export const authReducer = (state = defaulteState, action) => {
	switch (action.type) {
		case "LOGIN":
			return {...state, user: action.payload}
		case "LOGOUT":
			return {...state, user: null}
	
		default:
			return state;
	}
}

export const loginAction = (payload) => ({type: LOGIN, payload})
export const logoutAction = (payload) => ({type: LOGOUT, payload})