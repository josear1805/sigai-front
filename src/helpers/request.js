import { notification } from "antd";import { enviroments } from "src/config/enviroments";

export const makeRequest = ({path, method, body = null, withToken = true}) => {
    const token = process.browser && JSON.parse(localStorage.getItem("token_sigai"))

    const url = enviroments.api + path;
    const config = {
        method: method,
        headers: {
            // "Content-Type": "application/json",
            // Accept: "application/json",
        }
    };

    if (withToken && token) {
        config.headers.Authorization = token;
    }
    console.log("body", body)
    if (body) {
        config.body = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
        fetch(url, config)
            .then((response) => {
                if(response.status === 401){
                    notification.error({
                        message: response.mensaje,
                        placement: "bottomRight",
                    });
                    localStorage.removeItem("token_sigai");
                    window.location.replace(`${window.location.origin}/login`);
                    reject(response.message);
                }
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                if (response.estatus === 401) {
                    notification.error({
                        message: response.mensaje,
                        placement: "bottomRight",
                    });
                    localStorage.removeItem("token_sigai");
                    window.location.replace(`${window.location.origin}/login`);
                    reject(response.message);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
