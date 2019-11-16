import * as React from "react";
import * as ReactDOM from "react-dom";

import ImageInspector from "./components/ImageInspector";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./store";

var store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<div>
			<ImageInspector />
		</div>
	</Provider>,
	document.getElementById("example")
);