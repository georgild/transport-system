import React from 'react';
import Arrivals from './Arrivals';
import Departures from './Departures';
import NavBar from './NavBar';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { componentToShow: 0 }; // 0 - Arrivals, 1 - Departures, TODO should go in Enum
    }

    handleBarClick = (componentClicked) => {
        this.setState({ componentToShow : componentClicked });
    }

    render() {
        return (
            <div className="App-main">
                <NavBar onBarClick={this.handleBarClick}/>
                <div className="App-data-container">
                    {
                        this.state.componentToShow === 0 ?
                            <Arrivals url="http://localhost:9001/api/v1/routes" pollInterval={50000} initialFilters={[{Property: 'Type', Value: 0, Operator: 'eq'}]}/>
                        :
                            <Departures url="http://localhost:9001/api/v1/routes" pollInterval={50000} initialFilters={[{Property: 'Type', Value: 1, Operator: 'eq'}]}/>
                    }
                </div>
            </div>
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