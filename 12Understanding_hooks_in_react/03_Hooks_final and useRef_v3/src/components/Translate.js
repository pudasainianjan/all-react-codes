import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';


const options = [
    {
        label: 'Afrikans',
        value: 'af'
    },
    {
        label: 'Arabic',
        value: 'ar'
    },
    {
        label: 'Hindi',
        value: 'hi'
    },
    {
        label:'Dutch',
        value:'nl'
    },
    {
        label:'Nepali',
        value:'ne'
    }
];

const Translate = () =>{

    const [language,setLanguage] = useState(options[4]);
    const [text,setText] = useState('');

    return (
        <div>
            <div className="ui form">
                <label>Enter Text</label>
                <input value={text} onChange={e=>setText(e.target.value)} />
            </div>
            <Dropdown label="Select a Language" options={options} selected={language} onSelectedChange={setLanguage} />
            <hr/>
            <h3 className="ui header">
                <Convert text={text} language={language} />
            </h3>
        </div>
    );
};

export default Translate;