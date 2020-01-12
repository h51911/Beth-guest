export const Login = 'Login';
export const Logout = 'Logout';
export const Rag = 'Rag';
export const CunToken = 'CunToken';



let initState = {
    phone: '',
    userphone: '',
    token: ''
}

const reducer = function (state = initState, { type, payload }) {
    switch (type) {
        // {type:'login',payload:userInfo}
        case 'Login':
            return {
                ...state,
                userphone: payload
            }
        case 'CunToken':
            return {
                ...state,
                token: payload
            }
        case 'Logout':
            return {
                ...state,
                phone: ''
            }
        case 'Rag':
            return {
                ...state,
                phone: payload
            }
        default:
            return state;
    }
}

export default reducer;