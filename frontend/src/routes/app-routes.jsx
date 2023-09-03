import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AxiosInterceptor } from "../services/rest-client/rest-interceptor";
export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AxiosInterceptor />
            <Routes>
                <Route element={<>TESTE</>} path="/" />

                <Route element={<Navigate to={"/"} />} path="/*" />
            </Routes>
        </BrowserRouter>
    );
}
