import React from 'react';
import Arrivals from './Arrivals';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    render() {
        return (
            <table>
            <thead>
              <tr>
                  <th>Arrivals</th>
                  <th>Departures</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td><Arrivals/></td>
                  <td><Arrivals/></td>
              </tr>
            </tbody>
            </table>
        );
    }
}

export default Main;