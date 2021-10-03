import { enviroments } from "src/config/enviroments";

export const makeRequest = ({
    path,
    method,
    body = null,
    withToken = false,
    authValue = null,
}) => {
    // const token = process.browser && JSON.parse(localStorage.getItem("_token"));
    const url = enviroments.api + path;
    const config = {
        method: method,
        // headers: {
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        // },
    };

    if (authValue) {
        config.headers.Authorization = `${authValue}`;
    } else if (withToken) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (body) {
        config.body = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
        fetch(url, config)
            .then((response) => {
                // console.log(response.status);
                if (response.status === 401) {
                    // localStorage.removeItem("_token");
                    window.location.replace(`${window.location.origin}/login`);
                    reject(response.message);
                }
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.error("ERRORRR", error);
                reject(error);
            });
    });
};
