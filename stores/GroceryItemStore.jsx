'use strict';

var React = require('react');
var dispatcher = require('./../views/dispatcher.js');

class GroceryItemStore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.state.items = [
            {
                name: 'Ice Cream'
            },
            {
                name: 'Waffles'
            },
            {
                name: 'Candy',
                purchased: true
            },
            {
                name: 'Snacks'
            }
        ];

        this.state.listeners = [];

        this.addGroceryItem = this.addGroceryItem.bind(this);
        this.deleteGroceryItem = this.deleteGroceryItem.bind(this);
        this.setGroceryItemBought = this.setGroceryItemBought.bind(this);
        this.getItems = this.getItems.bind(this);
        this.onChange = this.onChange.bind(this);
        this.triggerListeners = this.triggerListeners.bind(this);
        this.registerDispatch = this.registerDispatch.bind(this);

        this.registerDispatch();
    }

    addGroceryItem(item) {
        this.state.items.push(item);
        this.triggerListeners();
    }

    deleteGroceryItem(item) {
        var index = this.state.items.findIndex(function (_item) {
            return _item.name === item.name;
        });


        console.log("removing " + item.name + " from index", index);
        this.state.items.splice(index, 1);
        this.triggerListeners();
    }

    setGroceryItemBought(item, isBought) {
        var currentItem = this.state.items.filter(function (_item) {
            return _item.name === item.name
        })[0];
        currentItem.purchased = isBought || false;
        this.triggerListeners();
    }

    getItems() {
        return this.state.items;
    }

    onChange(listener) {
        this.state.listeners.push(listener);
    }

    triggerListeners() {
        var _this = this
        this.state.listeners.forEach(function (listener) {
            listener(_this.state.items);
        });
    }

    registerDispatch() {
        var _this = this;
        dispatcher.register(function (event) {
            var split = event.type.split(':');
            if (split[0] === 'grocery-item') {
                switch (split[1]) {
                    case "add":
                        _this.addGroceryItem(event.payload);
                        break;
                    case "delete":
                        _this.deleteGroceryItem(event.payload);
                        break;
                    case "buy":
                        _this.setGroceryItemBought(event.payload, true);
                        break;
                    case "unbuy":
                        _this.setGroceryItemBought(event.payload, false);
                        break;
                }
            }
        });
    }
}

module.exports = GroceryItemStore;
