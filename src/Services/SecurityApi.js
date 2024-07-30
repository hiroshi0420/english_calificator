import axios from "axios";
import Router from "../Router/router";


export class SecurityApi {


    async login(login) {
        return await axios.post(
            `${Router.apiBaseUrl}${Router.apiLogin}`,
            {...login}
        )
        .then(async (resp) => {
            return resp;
        })
        .catch(async (err) => {
            return err;
        })
    }


}