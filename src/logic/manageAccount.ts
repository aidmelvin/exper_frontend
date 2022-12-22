
import {
    BASE_URL,
    SET_USER_INFORMATION
} from "../constants/URLs";

export const setProfileInformation = async (first_name: string, last_name: string, university_email: string,
                                            phone_number: string, university: string, gender: string,
                                            year: string, short_bio: string, preference: string, age: string,
                                            interests: Array<string>) => {
    
    const body = JSON.stringify({ first_name, last_name, university_email, phone_number,
                                    university, gender, year, short_bio, preference, age, interests });
    const response = await fetch(`${BASE_URL}${SET_USER_INFORMATION}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body, // shorthand for body: body
        credentials: "include", // causes it to send cookies
        mode: "cors"
    })
    .then((res) => res.json());

    return response['message'];
}
