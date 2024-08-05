import Router from "../Router/router";
import axios from "axios";

export class TestApi {

    async getTestById(userId, testId = null) {
        try {
            // Construimos la URL con el parámetro userId
            let url = `${Router.apiBaseUrl}${Router.apiGetTest.replace(':id', userId)}`;
    
            // Si testId está presente, lo agregamos como query parameter
            if (testId !== null) {
                url += `?testId=${testId}`;
            }
    
            const response = await axios.get(url);
            return response.data; // Devolvemos los datos de la respuesta
        } catch (e) {
            console.error('Error:', e);
            throw e; // Lanza el error para manejarlo fuera de la función si es necesario
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

    async getWritingTestById(testId) {
        try {
            const url = `${Router.apiBaseUrl}${Router.apiWritingTestById.replace(':testId', testId)}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching Writing test details:', error);
            throw error;
        }
    }
    
    async getReadingTestById(testId) {
        try {
            const url = `${Router.apiBaseUrl}${Router.apiReadingTestById.replace(':testId', testId)}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching Reading test details:', error);
            throw error;
        }
    }

    async getSpeakingTestById(testId) {
        try {
            const url = `${Router.apiBaseUrl}${Router.apiSpeakingTestById.replace(':testId', testId)}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching Speaking test details:', error);
            throw error;
        }
    }

}