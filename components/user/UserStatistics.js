import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Spinner } from 'reactstrap';
import Constants from '../util/constants';

class UserStatistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        // TODO use a gameplay specific endpoint instead
        const res = await fetch(`${Constants.api.pathPrefix}/users/current`);
        if(res.status === 200) {
            const user = await res.json();
            this.setState({gameplays : user.gameplays});
        } else {
            // TODO proper error handling
            return null;
        }
    }
    
    render() {
        if(!this.state.gameplays) {
            return (
                <div align="center" style={{margin: "10px"}}>
                    <Spinner type="border" style={{width: "26px", height: "26px"}} />
                </div>
            )
        }
        
        let results = {
            win: 0,
            lose: 0,
            draw: 0
        };

        this.state.gameplays.forEach(gameplay => {
            if(gameplay.result) {
                let result = gameplay.result.toLowerCase();
                results[result]++;
            }
        });

        const data = {
            labels: ['Win', 'Lose', 'Draw'],
            datasets: [
              {
                label: 'Win / Lose ratio',
                backgroundColor: [
                    'rgba(0,255,0,1)',
                    'rgba(255,0,0,1)',
                    'rgba(150,150,150,1)'
                ],
                data: [results.win, results.lose, results.draw]
              }
            ]
          };

        return (
            <Doughnut data={data}/>
        )
    }
}

export default UserStatistics;