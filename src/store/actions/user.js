import { Rag, Logout, Login, CunToken } from '../reducer/user';

export function addphone(phone) {
    return {
        type: Rag,
        payload: phone
    }
}
export function addtoken(token) {
    return {
        type: CunToken,
        payload: token
    }
}

export function adduserphone(phone) {
    return {
        type: Login,
        payload: phone
    }
}


export function addLoginOut(phone) {
    return {
        type: Logout,
        payload: phone
    }
}


export default {
    addphone,
    addLoginOut
}
