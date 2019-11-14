import React from "react";

import "./Button.scss";

export interface ButtonProps {
    title: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    handleClick?: () => void;
}

const Button = (props: ButtonProps) => (
    <button data-testid="button" className="button" type={props.type || "submit"} disabled={props.disabled} onClick={props.handleClick}>
        {props.title}
    </button>
);

export default Button;