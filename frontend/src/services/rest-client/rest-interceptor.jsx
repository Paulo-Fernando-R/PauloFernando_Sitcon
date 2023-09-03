import axios from "axios";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

const AxiosInterceptor = () => {
    const reqInterceptor = async (config) => {
        config.validateStatus = () => {
            return true;
        };
        return config;
    };

    const resInterceptor = (response) => {
        return response;
    };

    const errInterceptor = async (error) => {
        // eslint-disable-next-line no-unused-vars
        const { config } = error;
        return Promise.reject(error);
    };

    request.interceptors.request.use(reqInterceptor);
    request.interceptors.response.use(resInterceptor, errInterceptor);

    return null;
};

export { AxiosInterceptor, request };
