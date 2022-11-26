
import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS
} from "../constants/Constants";

import {
    SIGNUP_API_ENDPOINT,
    LOGIN_API_ENDPOINT,
    BASE_URL
} from "../constants/URLs";

import axios from 'axios';

export const login = async (university_email: string, password: string) => {
    try {
        const body = JSON.stringify({ university_email, password });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await axios.post(`${BASE_URL}${LOGIN_API_ENDPOINT}`, body, config);

        // console.log(JSON.stringify(response));
        return LOGIN_SUCCESS;
    } catch (err) {
        // console.log('error: ', err);
        return LOGIN_FAILURE;
    }
}

export const signup = async (first_name: string, last_name: string, university: string,
    university_email: string, year: string,
    gender: string, short_bio: string,
    phone_number: string, password: string) => {

    const body = JSON.stringify({ first_name, last_name, university, university_email, year, gender, short_bio, phone_number, password });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length.toString()
        }
    };
    // console.log("body: ", body);

    try {
        const res = await axios.post(`${BASE_URL}${SIGNUP_API_ENDPOINT}`, body, config);
        // console.log('response: ', res);
        return SIGNUP_SUCCESS;
    } catch (err) {
        return SIGNUP_FAILURE;
    }
}
