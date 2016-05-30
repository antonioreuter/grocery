'use strict';

var React = require('react');
var dispatcher = require('./../views/dispatcher.js');
var restHelper = require('./../helpers/RestHelper.js');

class GroceryItemStore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.state.items = [];

        this.state.listeners = [];

        this.addGroceryItem = this.addGroceryItem.bind(this);
        this.deleteGroceryItem = this.deleteGroceryItem.bind(this);
        this.setGroceryItemBought = this.setGroceryItemBought.bind(this);
        this.getItems = this.getItems.bind(this);
        this.onChange = this.onChange.bind(this);
        this.triggerListeners = this.triggerListeners.bind(this);
        this.registerDispatch = this.registerDispatch.bind(this);
        this.loadItems = this.loadItems.bind(this);

        this.registerDispatch();
        this.loadItems();
    }

    loadItems() {
        var _this = this;
        restHelper.get("api/items").then(function (data) {
            _this.state.items = data;
            _this.triggerListeners();
        });
    }

    addGroceryItem(item) {
        this.state.items.push(item);
        this.triggerListeners();

        restHelper.post("api/items", item);
    }

    deleteGroceryItem(item) {
        var index = this.state.items.findIndex(function (_item) {
            return _item.name === item.name;
        });


        console.log("removing " + item.name + " from index", index);
        this.state.items.splice(index, 1);
        this.triggerListeners();

        restHelper.del("api/items/" + item._id);
    }

    setGroceryItemBought(item, isBought) {
        var currentItem = this.state.items.filter(function (_item) {
            return _item.name === item.name
        })[0];
        currentItem.purchased = isBought || false;
        this.triggerListeners();

        restHelper.patch("api/items/" + item._id, item);
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
