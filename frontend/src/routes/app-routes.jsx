import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AxiosInterceptor } from "../services/rest-client/rest-interceptor";
import PatientList from "../pages/patient-list-page/patient-list";
import SolicitationPage from "../pages/solicitation-page/solicitation-page";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AxiosInterceptor />
            <Routes>
                <Route element={<PatientList />} path="/" />
                <Route element={<SolicitationPage />} path="/solicitation" />
                <Route element={<Navigate to={"/"} />} path="/*" />
            </Routes>
        </BrowserRouter>
    );
}
