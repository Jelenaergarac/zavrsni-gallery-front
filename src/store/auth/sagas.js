import {takeLatest, call, put} from '@redux-saga/core/effects'
import {
    getActiveUser, login, logout, register, setActiveUser, setToken
} from './slice'

import UserService from '../../services/UserService'

function* handleRegister(action){
    try{
      const {user, token} = yield call(UserService.register,action.payload)
    yield put(setActiveUser(user))
    yield put(setToken(token))
    }catch(error){
        console.error(error)

    }
   

}

function* handleLogin(action){
    try{

        const {user, token} = yield call(UserService.login, action.payload)
        yield put(setActiveUser(user))
        yield put(setToken(token))
    }catch(error){
        console.error(error)
        alert('please, check your credentials')
    }
}

function* handleLogout(){
    try{
        yield call(UserService.logout)
        yield put(setToken(null))
        yield put(setActiveUser(null))

    }catch(error){
        console.error(error)
    }
}

function* handleActiveUser(){
    try{
        const activeUser = yield call(UserService.getActiveUser)
        yield put(setActiveUser(activeUser))

    }catch(error){
        console.error(error)
    }
}


export function* watchRegister(){
    yield takeLatest(register.type, handleRegister)
}

export function* watchLogin(){
    yield takeLatest(login.type, handleLogin)
}

export function* watchLogout(){
    yield takeLatest(logout.type, handleLogout)
}

export function* watchActiveUser(){
    yield takeLatest(getActiveUser.type, handleActiveUser)
}