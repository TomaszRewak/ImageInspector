import * as React from "react";
import * as ReactDOM from "react-dom";

import ImageInspector from "./components/ImageInspector";
import './styles/App.css'

ReactDOM.render(
	<div className='fill'>
		<ImageInspector />
	</div>,
	document.getElementById("app")
);