import "./styles/solicitation-page-styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import Druthers from "druthers";
import { useEffect, useState } from "react";
import { patientRepository } from "../../repositories/patient-repository";
import { procedureRepository } from "../../repositories/procedure-repository";
import { professionalRepository } from "../../repositories/professional-repository";
import { solicitationRepository } from "../../repositories/solicitation-repository";

export default function SolicitationPage() {
    const { patientId } = useLocation().state;
    const navigate = useNavigate();

    const [patientName, setPatientName] = useState("");
    const [patientBorn, setPatientBorn] = useState("");
    const [patientCpf, setPatientCpf] = useState("");

    const [professionalOptions, setProfessionalOptions] = useState([]);
    const [solicitationOptions, setSolicitationOptions] = useState([]);
    const [procedureOptions, setProcedureOptions] = useState([]);
    const [procedureFiltered, setProcedureFiltered] = useState([{ label: "Vazio", value: -2 }]);

    const [professional, setProfessional] = useState();
    const [solicitation, setSolicitation] = useState();
    const [procedures, setProcedures] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    async function getFormData() {
        if (solicitation) {
            setSolicitation(undefined);
        }

        if (procedures.length > 0) {
            setProcedures([]);
        }
        try {
            const response = await patientRepository.getById(patientId);

            setPatientBorn(new Date(Date.parse(response.data[0].data_nasc)).toLocaleDateString());
            setPatientName(response.data[0].name);
            setPatientCpf(response.data[0].CPF);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }

        try {
            const listAux = [];
            const response = await procedureRepository.getProcedureTypes();
            if (!response || !response.data) {
                return;
            }
            response.data.forEach((e) => {
                const temp = { label: e.description, value: e.id };
                listAux.push(temp);
            });

            setSolicitationOptions(listAux);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }

        try {
            const listAux = [];
            const response = await professionalRepository.getAll();
            if (!response || !response.data) {
                return;
            }
            response.data.forEach((e) => {
                const temp = { label: e.name, value: e.id };
                listAux.push(temp);
            });
            setProfessionalOptions(listAux);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }

        try {
            if (!professional) {
                return;
            }
            const listAux = [];
            const response = await procedureRepository.getByProfessional(parseInt(professional));
            response.data.forEach((e) => {
                const temp = { label: e.description, value: e.id, type: e.procedure_type };
                listAux.push(temp);
            });
            setProcedureFiltered([{ label: "Vazio", value: -2 }]);
            setProcedureOptions(listAux);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    function listFilter(type) {
        const listAux = [];

        procedureOptions.forEach((e) => {
            if (e.type === parseInt(type)) {
                listAux.push(e);
            }
        });
        if (listAux.length === 0) {
            setProcedureFiltered([{ label: "Vazio", value: -2 }]);
            return;
        }
        setProcedureFiltered(listAux);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!professional || !solicitation) {
            return;
        }

        if (procedures.length === 0 || procedures[0].value === -2) {
            return;
        }

        if (!Date(`${date} : ${time}`)) {
            return;
        }
        const dateTime = new Date(`${date} : ${time}`);
        try {
            await solicitationRepository.create(
                parseFloat(professional),
                patientId,
                dateTime,
                procedures
            );
            alert("Adicionado");
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            window.location.reload();
        }
    }

    useEffect(() => {
        void getFormData();
    }, [professional]);

    return (
        <div id="solicitation-main-container">
            <div id="solicitation-content">
                <button className="back-button" onClick={() => navigate(-1)}>
                    Voltar
                </button>
                <div id="patient-container">
                    <ul>
                        <li>Nome do paciente</li>
                        <input type="text" value={patientName} disabled={true} />
                    </ul>
                    <ul>
                        <li>Data de nascimento</li>
                        <input type="text" value={patientBorn} disabled={true} />
                    </ul>
                    <ul>
                        <li>CPF</li>
                        <input type="text" value={patientCpf} disabled={true} />
                    </ul>
                </div>

                <div id="message-container">
                    <strong>Atenção!</strong>
                    Os campos com * devem ser preenchidos obrigatóriamente.
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="professional">Profissional*</label>
                        <Druthers
                            checkRadioMaxCount={0}
                            name="Single"
                            onChange={(e) => setProfessional(e.target.value)}
                            options={professionalOptions}
                            selection={professional}
                            creatable={false}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="type">Tipo de solicitação*</label>
                        <Druthers
                            checkRadioMaxCount={0}
                            name="Single"
                            onChange={(e) => {
                                setSolicitation(e.target.value);
                                listFilter(e.target.value);
                            }}
                            options={solicitationOptions}
                            selection={solicitation}
                            disabled={!professional ? true : false}
                            creatable={false}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="procedure">Procedimentos*</label>
                        <Druthers
                            checkRadioMaxCount={0}
                            multiple
                            name={solicitation === "2" ? "Multiple" : "Single"}
                            onChange={(e) => setProcedures(e.target.value)}
                            options={procedureFiltered}
                            selection={procedures}
                            disabled={!professional || !solicitation ? true : false}
                            creatable={false}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="date">Data*</label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="time">Hora*</label>
                        <input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    <div id="submit-box">
                        <button>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
