import Router from "../Router/router";
import axios from "axios";

export class TestApi {

    async getTestById(userId, testId = null) {
        try {
            let url = `${Router.apiBaseUrl}${Router.apiGetTest.replace(':id', userId)}`;
            
            if (testId !== null) {
                url += `?testId=${testId}`;
            }
    
            const response = await axios.get(url);
            return response; 
        } catch (e) {
            console.error('Error:', e);
            throw e;
        }
    }
    

    async getTestByCompanyCompleted(id) {
        try {
            const url = `${Router.apiBaseUrl}${Router.apiGetTestByCompanyComplete.replace(':id', id)}`;
            const response = await axios.get(url);
            return response;
        } catch (e) {
            console.error('Error:', e);
        }
    }

}