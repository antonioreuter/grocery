"use strict";

var React = require('react');
var action = require('./../actions/GroceryItemActionCreator.jsx');

class GroceryItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.delete = this.delete.bind(this);
        this.tooglePurchased = this.tooglePurchased.bind(this);
        this._updateViewState = this._updateViewState.bind(this);

        this._updateViewState();
    }

    delete(e) {
        e.preventDefault();
        action.delete(this.props.item);
    }

    tooglePurchased(e) {
        e.preventDefault();

        (this.props.item.purchased) ? action.unbuy(this.props.item) : action.buy(this.props.item);
        this._updateViewState();
    }

    _updateViewState() {
        if (this.props.item.purchased) {
            this.state.buyClassName = 'purchased-true';
            this.state.buyButtonLabel = 'un buy';
        } else {
            this.state.buyClassName = 'purchased-false';
            this.state.buyButtonLabel = 'buy';
        }
    }

    render() {
        this._updateViewState();
        
        return (
            <div className="grocery-item row">
                <div className="six columns">
                    <h4 className={this.props.item.purchased ? "strikethrough" : "" }>{this.props.item.name}</h4>
                </div>
                <form className="three columns" onSubmit={this.tooglePurchased}>
                    <button className={this.state.buyClassName}>{this.state.buyButtonLabel}</button>
                </form>
                <form className="three columns" onSubmit={this.delete}>
                    <button>&times;</button>
                </form>
            </div>
        );
    }
}


module.exports = GroceryItem;
