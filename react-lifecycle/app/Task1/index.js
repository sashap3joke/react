import React, { Component } from "react";

export default class Task1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null,
            loading: true
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ list: data, loading: false });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
            });
    }

    render() {
        const { list, loading } = this.state;

        if (loading) {
            return <div style={{ border: '1px solid' }}>Loading...</div>;
        }

        if (!list) {
            return <div style={{ border: '1px solid' }}>Error loading data</div>;
        }

        return (
            <div style={{ display: 'flex' }}>
                {list.map(item => (
                    <div style={{ border: '1px solid', margin: '10px', width: '30%' }}>

                        <ul key={item.id}>
                            <p>id - {item.id}</p>
                            <p>name - {item.name}</p>
                            <p>note - {item.note}</p>
                        </ul>
                    </div>

                ))}
            </div>
        );
    }
}