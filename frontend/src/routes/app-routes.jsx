import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AxiosInterceptor } from "../services/rest-client/rest-interceptor";
import PatientList from "../pages/patient-list-page/patient-list";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AxiosInterceptor />
            <Routes>
                <Route element={<PatientList />} path="/" />

                <Route element={<Navigate to={"/"} />} path="/*" />
            </Routes>
        </BrowserRouter>
    );
}
