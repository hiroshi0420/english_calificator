import Router from "../Router/router";
import axios from "axios";

export class TestApi {

    async getTestById(id) {
        try {
            const url = `${Router.apiBaseUrl}${Router.apiGetTest.replace(':id', id)}`;
            const response = await axios.get(url);
            return response;
        } catch (e) {
            console.error('Error:', e);
        }
    }

}