/* eslint-disable react/prop-types */
import "./styles/list-components-styles.css";

export function ListTitle({ title }) {
    return (
        <div id="list-title-box">
            {title.map((e, index) => {
                return <span key={index}>{e}</span>;
            })}
        </div>
    );
}

export function ListItem({ row, action }) {
    return (
        <div id="list-item-box">
            {row.map((e, index) => {
                return <span key={index}>{e}</span>;
            })}
            <span>
                <button onClick={() => action()}>Prosseguir</button>
            </span>
        </div>
    );
}
