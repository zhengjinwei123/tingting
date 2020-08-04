import React from 'react';
import ReactDom from 'react-dom';
import RouterMap from "src/routers/routerMap.jsx";
import md5 from "js-md5"

React.Component.prototype.$md5 = md5

import configureStore from "store/index.jsx";
import { Provider  } from "react-redux";
import { persistor } from "store/index.jsx";
import {PersistGate} from 'redux-persist/lib/integration/react';
// const store = configureStore();

ReactDom.render(
    <Provider store={configureStore}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterMap />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
)