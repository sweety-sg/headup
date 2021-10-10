import React from 'react';
import {render} from '@testing-library/react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export const logout = () => async (dispatch) => {
    try {
        await axios.get('http://127.0.0.1:3000/headup/logout')
        // localStorage.removeItem('userInfo')
        // dispatch({ type: type.USER_LOGOUT })
    } catch (error) {
        console.log(error)
    }
}
