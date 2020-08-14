import React, {Suspense} from 'react';
import {
    Route,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom';

import routes from "./data/routes";

function App() {
    return (
        <div className="App">
            <Suspense fallback={<p>loading</p>}>
                <Router>

                    <Switch>
                        {
                            routes.map((route, idx, props) => (
                                <Route key={idx} path={route.path} component={route.component}
                                       exact={route.exact} {...props}/>


                            ))
                        }

                    </Switch>

                </Router>
            </Suspense>
        </div>
    );
}

export default App;
