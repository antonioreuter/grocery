"use strict";

var React = require('react');
var GroceryItem = require('./GroceryItem.jsx');
var GroceryListAddItem = require('./GroceryListAddItem.jsx');

class GroceryItemList extends React.Component {
    render() {
        return (
            <div>
                <h1>Grocery Listify</h1>
                <div>
                    {
                        this.props.items.map(function (item, index) {
                            return (
                                <GroceryItem item={ item } key={ "item" + index }/>
                            );
                        })
                    }
                </div>

                <GroceryListAddItem />
            </div>
        );
    }
}

module.exports = GroceryItemList;
