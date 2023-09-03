/* eslint-disable react/prop-types */
import "./styles/patient-list-styles.css";
import { AiOutlineSearch } from "react-icons/ai";
import { ListTitle, ListItem } from "./components/list-components";
import { patientRepository } from "../../repositories/patient-repository";
import { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";

function getDateString(date) {
    return new Date(Date.parse(date)).toLocaleDateString();
}

function List({ currentItens }) {
    return (
        <>
            {currentItens.length > 0 ? (
                currentItens.map((e, index) => {
                    return (
                        <ListItem key={index} row={[e.name, getDateString(e.data_nasc), e.CPF]} />
                    );
                })
            ) : (
                <></>
            )}
        </>
    );
}

export default function PatientList() {
    const [list, setList] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState("");
    const [searchList, setSearchList] = useState([]);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = list.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(list.length / itemsPerPage);

    async function getData() {
        try {
            const response = await patientRepository.getAll();

            if (response.sucess) {
                setList([...response.data]);
            }
        } catch (error) {
            alert(error.message);
        }
        await patientRepository.getAll();
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % list.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    function onSearch(text) {
        setSearch(text);

        if (text.length < 2) {
            setSearchList([]);
            return;
        }

        const temp = [];
        list.forEach((element) => {
            if (
                element.name.toLowerCase().includes(text.toLowerCase()) ||
                element.CPF.toLowerCase().includes(text.toLowerCase())
            ) {
                temp.push(element);
            }
        });

        setSearchList(temp);
    }

    useEffect(() => {}, []);

    useMemo(() => {
        void getData();
    }, []);
    return (
        <div id="patient-main-container">
            <div id="patient-content">
                <div id="search-box">
                    <AiOutlineSearch />
                    <input
                        type="search"
                        placeholder="Pesquisar"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                <div id="list-box">
                    <ListTitle title={["Paciente", "Nascimento", "CPF", "Açoes"]} />
                    <List currentItens={searchList.length < 1 ? currentItems : searchList} />
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}
