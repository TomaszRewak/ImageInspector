import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { ImageSelector } from "./components/ImageSelector";

ReactDOM.render(
	<div>
		<Hello compiler="TypeScript" framework="React" />
		<ImageSelector />
	</div>,
	document.getElementById("example")
);