
import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS,
    CORRECT_CREDENTIALS,
    INCORRECT_PASSWORD,
    NO_USER
} from "../constants/Constants";

import {
    SIGNUP_API_ENDPOINT,
    LOGIN_API_ENDPOINT,
    LOGOUT_API_ENDPOINT,
    BASE_URL
} from "../constants/URLs";

import axios from 'axios';

export const logout = async () => {
    const response = await fetch(`${BASE_URL}${LOGOUT_API_ENDPOINT}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        }, // shorthand for body: body
        credentials: "include", // causes it to send cookies
        mode: "cors"
    })
    .then((res) => res.json());
}

export const login = async (username: string, password: string) => {
    try {
        const body = JSON.stringify({ username, password });

        const response = await fetch(`${BASE_URL}${LOGIN_API_ENDPOINT}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body, // shorthand for body: body
            credentials: "include", // causes it to send cookies
            mode: "cors"
        })
        .then((res) => res.json());

        if (response['message'] === CORRECT_CREDENTIALS) {
            return LOGIN_SUCCESS;
        } else if (response['message'] === INCORRECT_PASSWORD) {
            return LOGIN_FAILURE;
        } else if (response['message'] === NO_USER) {
            return LOGIN_FAILURE;
        } else {
            return LOGIN_SUCCESS;
        }
    } catch (err) {
        console.log('error: ', err);
        return LOGIN_FAILURE;
    }
}

export const signup = async (first_name: string, last_name: string, university: string,
    university_email: string, year: string,
    gender: string, short_bio: string,
    phone_number: string, password: string, age: string, preference: string,
    interests: Array<string>) => {

    const body = JSON.stringify({ first_name, last_name, university, university_email, 
                                year, gender, short_bio, phone_number, password,
                                age, preference, interests });
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const res = await axios.post(`${BASE_URL}${SIGNUP_API_ENDPOINT}`, body, config);
        return SIGNUP_SUCCESS;
    } catch (err) {
        return SIGNUP_FAILURE;
    }
}
