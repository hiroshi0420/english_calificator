import axios from "axios";
import Router from "../Router/router";


export class QuestionApi {
    constructor() { }


    async getWritingTest() {
        try {
            const response = await axios.get(`${Router.apiBaseUrl}${Router.apiWritingTest}`, {
                params: {
                    questionsNumber: 3
                }
            });
            return response;
        } catch (error) {
            console.error("Error fetching writing test data:", error);
            throw error;
        }
    }
    

    async getReadingTest() {
        try {
            const response = await axios.get(`${Router.apiBaseUrl}${Router.apiReadingTest}`);
            return response;
        } catch (error) {
            console.error("Error fetching writing test data:", error);
            throw error;
        }
    }

    async getListeningTest() {
        try {
            const response = await axios.get(`${Router.apiBaseUrl}${Router.apiListeningTest}`, {
                params: {
                    questionsNumber: 1
                }
            });
            return response;
        } catch (error) {
            console.error("Error fetching listening test data:", error);
            throw error;
        }
    }

    async getSpeakingTest() {
        try {
            const response = await axios.get(`${Router.apiBaseUrl}${Router.apiSpeakingTest}`);
            return response;
        } catch (error) {
            console.error("Error fetching writing test data:", error);
            throw error;
        }
    }

    async getResultsTest() {
        try {
            const response = await axios.get(`${Router.apiBaseUrl}${Router.apiResultsTest}`);
            return response;
        } catch (error) {
            console.error("Error fetching writing test data:", error);
            throw error;
        }
    }

    // Post

    async sendWritingTest(data) {
        return await axios.post(Router.apiBaseUrl + Router.apiWritingTest, data)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            });
    }

    async sendReadingTest(data) {
        return await axios.post(Router.apiBaseUrl + Router.apiReadingTest, data)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            });
    }

    async sendSpeakingTest(data) {
        return await axios.post(Router.apiBaseUrl + Router.apiSpeakingTest, data)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            });
    }

    async sendListeningTest(data) {
        return await axios.post(Router.apiBaseUrl + Router.apiListeningTest, data)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            });
    }


}