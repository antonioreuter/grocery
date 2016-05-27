console.log("Hello from jsx");

var React = require('react');
var ReactDOM = require('react-dom');

var GroceryItemList = require('../components/GroceryItemList.jsx');
var GroceryItemStore = require('../stores/GroceryItemStore.jsx');

var store = new GroceryItemStore();
var initial = store.getItems();

function render() {
    ReactDOM.render(<GroceryItemList items={initial}/>, app);
}

store.onChange(function (list) {
    initial = list;
    render();
});

render();




