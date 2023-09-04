import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AxiosInterceptor } from "../services/rest-client/rest-interceptor";
import PatientList from "../pages/patient-list-page/patient-list";
import SolicitationPage from "../pages/solicitation-page/solicitation-page";
import MenuBar from "../pages/global-components/menu-bar/menu-bar";
import SolicitationListPage from "../pages/solicitation-list-page/solicitation-list-page";
export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AxiosInterceptor />
            <MenuBar/>
            <Routes>
                <Route element={<PatientList />} path="/" />
                <Route element={<SolicitationPage />} path="/solicitation" />
                <Route element={<SolicitationListPage />} path="/solicitation-list" />
                <Route element={<Navigate to={"/"} />} path="/*" />
            </Routes>
        </BrowserRouter>
    );
}
