//import cx from 'classnames';
import { Component } from 'react';
import Autocomplete from './AutoComplete';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], remaining: 0, country: "" }
    }

    addItem() {
        const taskInput = document.querySelector('#task');
        const text = taskInput.value.trim();
        if (text && !this.state.items.includes(text)) {
            taskInput.value = '';
            const items = this.state.items;
            items.push(`${text}${this.state.country ? ` - ${this.state.country}` : ''}`)
            this.setState((state) => {
                return { items, remaining: state.remaining + 1 };
            });
        }
    }

    toggleDone(e) {
        e.target.classList.toggle('is-done');
        const isDone = e.target.classList.contains("is-done")
        this.setState((state) => {
            return { remaining: isDone ? state.remaining - 1 : state.remaining + 1 };
        });
    }

    render() {
        return (
            <>
                <div>
                    <h2>
                        Todo List for a Team Manager
                    </h2>
                    <Autocomplete onSelectItem={country => this.setState(state => { return { country } })} />
                    <input id="task" type="text" placeholder="Write a task"></input>
                    <button onClick={() => this.addItem()}>Add</button>
                    <p className="task-counter">{this.state.remaining} remaining out of {this.state.items.length} tasks</p>
                    {this.state.items.length > 0 && (
                        <ul>
                            {this.state.items.map((item, i) => <li key={i} className="App-link" onClick={e => this.toggleDone(e)}>{item}</li>)}
                        </ul>
                    )}

                </div>
                <style>{`
                div {
                    padding: 3px;
                }
                h2 {
                    font-size: 1.2rem;
                }
                input, button {
                    padding: .5em;
                    border-radius: 5px;
                }
                .task-counter {
                    font-size: 0.8rem;
                }
                ul {
                    text-align: left;
                    border: 1px solid 
                }
                .is-done {
                    text-decoration: line-through;
                }

                `}</style>
            </>
        );
    }
}