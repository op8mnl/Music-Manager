// https://codesandbox.io/s/magical-christian-qxtdm?from-embed=&file=/src/App.js:41-75
// This modal template is taken from the above link and customized to fit application needs.

import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const SearchModal = (props) => {
	return ReactDOM.createPortal(
		<CSSTransition in={props.show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
			<div className="modal" onClick={props.onClose}>
				<div className="modal-content" onClick={(e) => e.stopPropagation()}>
					<div className="modal-header">
						<h2 className="modal-title">{props.title}</h2>
					</div>
					<div className="modal-body">{props.children}</div>
					<div className="modal-footer">
						<button onClick={props.onClose} className="button">
							Close
						</button>
					</div>
				</div>
			</div>
		</CSSTransition>,
		document.getElementById("root")
	);
};

export default SearchModal;
