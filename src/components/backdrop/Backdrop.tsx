import React from "react";

import "./Backdrop.scss";

const Backdrop = (props: { clicked: () => void }) => (
	<div className="backdrop" onClick={props.clicked}></div>
);

export default Backdrop;