import axios from "axios";
import Router from "../Router/router";


export class QuestionApi {
    constructor() { }


    async getWritingTest() {
        try {
            const response = await axios.get(`${Router.apiBaseUrl}${Router.apiWritingTest}`);
            return response;
        } catch (error) {
            console.error("Error fetching writing test data:", error);
            throw error;
        }
    }

    async sendWritingTest(data) {
        return await axios.post(Router.apiBaseUrl + Router.apiWritingTest, {
            question: data?.question,
            response: data?.response
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })
    }


}