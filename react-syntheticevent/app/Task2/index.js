import React, { Component } from "react";

export default class Task2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                { id: 1, text: "hidden text 1" },
                { id: 2, text: "hidden text 2" },
                { id: 3, text: "hidden text 3" },
            ],
            text: ''
        };
    }

    handleMouseEnter = (text) => {
        this.setState({ text });
    };

    handleMouseLeave = () => {
        this.setState({ text: '' });
    };

    render() {
        const { list, text } = this.state;

        return (
            <div>
                <ul role="list">
                    {list.map(item => (
                        <li
                            key={item.id}
                            className="element"
                            role="listitem"
                            onMouseEnter={() => this.handleMouseEnter(item.text)}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            id - {item.id}
                        </li>
                    ))}
                </ul>
                <div data-testid="text">{text}</div>
            </div>
        );
    }
}
