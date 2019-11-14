import React, { Fragment } from "react";
import Backdrop from "../backdrop/Backdrop";

import "./Modal.scss";

export interface ModalProps {
	dismiss: () => void;
	children: any;
}

const Modal = (props: ModalProps) => {
	return <Fragment>
		<Backdrop clicked={props.dismiss} />
		<div data-testid="modal" className={["modal", "open"].join(" ")}>
			{props.children}
		</div>
	</Fragment>
};

export default Modal;