import React from 'react';
import Arrivals from './Arrivals';
import Departures from './Departures';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    render() {
        return (
            <Arrivals url="http://localhost:9001/api/v1/routes" pollInterval={50000} initialFilters={[{Property: 'Type', Value: 1, Operator: 'eq'}]}/>
            /*<table>
                <thead>
                  <tr>
                      <th>Arrivals</th>
                      <th>Departures</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                         <td>
                            <Arrivals url="http://localhost:9001/api/v1/routes" pollInterval={50000}/>
                        </td>
                        <td>
                            <Departures url="http://localhost:9001/api/v1/routes" pollInterval={50000}/>
                        </td>
                  </tr>
                </tbody>
            </table>*/
        );
    }
}

export default Main;