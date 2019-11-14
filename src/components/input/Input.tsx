import React, { ChangeEvent } from "react";

import "./Input.scss";

interface InputFieldProps {
    name: string;
    type: string;
    value: string | number | string[];
    min?: string | number;
    max?: string | number;
    title?: string;
    isRequired?: boolean;
    placeholder?: string;
    handleChange?: (e: ChangeEvent) => void;
}

const InputField = (props: InputFieldProps) => {
    const input = <input data-testid="input-field" className="input-field"
        name={props.name}
        type={props.type}
        value={props.value}
        required={props.isRequired}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        onChange={props.handleChange}
    />

    return <div className="input-group">
        {props.title && <label data-testid="input-label" htmlFor={props.name} className="input-label">{props.title}</label>}
        {input}
    </div>
};

export default InputField;