import React, { useState, useRef } from 'react';
//import classnames from 'classnames';
// you should import `lodash` as a whole module
//import lodash from 'lodash';
import axios from 'axios';

const ITEMS_API_URL = 'https://restcountries.eu/rest/v2/name/<name>?fields=name';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

export default function Autocomplete(props) {

    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);

    const autoCompleteInput = useRef();
    const listHoverable = useRef();

    const change = e => {
        setText(e.target.value);
        setIsLoading(true);

        if (!isLoading) {
            setTimeout(() => {
                const searchText = autoCompleteInput.current.value;
                const url = ITEMS_API_URL.replace('<name>', searchText);
                axios.get(url)
                    .then(function (response) {
                        if (response.status === 200) {
                            setItems(response.data.filter(d => d.name.toLowerCase().includes(searchText)).map(res => res.name));
                            if (listHoverable.current) listHoverable.current.style.display = 'block';
                        }
                        setIsLoading(false);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                        setIsLoading(false);
                    })
            }, DEBOUNCE_DELAY);
        }
    }

    const click = item => {
        props.onSelectItem(item);
        listHoverable.current.style.display = 'none';
        setText(item)
    }

    return (
        <>
            <div className="wrapper">
                <div className="control">
                    {isLoading && <div className="is-loading">Loading...</div>}
                    <input ref={autoCompleteInput} type="text" className="input" placeholder="Select a country" value={text} onChange={e => change(e)} />
                </div>
                {!isLoading && <div ref={listHoverable} className="is-hoverable">
                    {items.map((item, i) => <p key={i}><span className="list-item App-link" onClick={() => click(item)}>{item}</span></p>)}
                </div>}
            </div>
            <style>{`
        .wrapper {
            position: relative;
        }
        .is-hoverable {
            width: 100%;
            text-align: center; 
            position: absolute;
            top: 35px;
            left: -5px;
            background-color: #282c34;
            opacity: 0.8;
        }
        .list-item {
            cursor: pointer;
        }
        `}
            </style>
        </>
    );
}