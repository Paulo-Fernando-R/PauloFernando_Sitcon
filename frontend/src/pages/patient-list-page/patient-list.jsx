import "./styles/patient-list-styles.css";
import { AiOutlineSearch } from "react-icons/ai";
import { ListTitle, ListItem } from "./components/list-components";
import { patientRepository } from "../../repositories/patient-repository";
import { useEffect } from "react";

const item = [
    ["Ellen Cmila Klen Sales", "10/08/2021", "659.295.950.97"],
    ["Ellen Cmila Klen Sales", "10/08/2021", "659.295.950.97"],
    ["Ellen Cmila Klen Sales", "10/08/2021", "659.295.950.97"],
    ["Ellen Cmila Klen Sales", "10/08/2021", "659.295.950.97"],
    ["Ellen Cmila Klen Sales", "10/08/2021", "659.295.950.97"],
    ["Ellen Cmila Klen Sales", "10/08/2021", "659.295.950.97"],
];

export default function PatientList() {
    
    async function getData() {
        await patientRepository.getAll();
    }

    useEffect(() => {
        void getData();
    }, []);

    return (
        <div id="patient-main-container">
            <div id="patient-content">
                <div id="search-box">
                    <AiOutlineSearch />
                    <input type="search" placeholder="Pesquisar" />
                </div>

                <div id="list-box">
                    <ListTitle title={["Paciente", "Nascimento", "CPF", "Açoes"]} />
                    {item.map((e, index) => {
                        return <ListItem key={index} row={e} />;
                    })}
                </div>
            </div>
        </div>
    );
}
