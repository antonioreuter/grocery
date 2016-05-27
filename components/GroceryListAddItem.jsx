'use restrict';

var React = require('react');
var action = require('./../actions/GroceryItemActionCreator.jsx');

class GroceryListAddItem extends React.Component {
    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
        this.handleInputName = this.handleInputName.bind(this);

        this.state = {
            input: ''
        };
    }

    handleInputName(e) {
        this.setState({
            input: e.target.value
        });
    }

    addItem(e) {
        e.preventDefault();
        console.log("Adding item!", this.state.input);
        action.add({
            name: this.state.input
        });

        this.setState({
            input: ''
        });
    }

    render() {
        return (
            <div className="grocery-addItem">
                <form onSubmit={this.addItem}>
                    <input value={this.state.input} type="text" onChange={this.handleInputName}/>
                    <button>Add Item</button>
                </form>
            </div>
        );
    }
}

module.exports = GroceryListAddItem;
