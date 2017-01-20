(function(){
  'use strict';

  angular.module('ShoppingListDirectiveApp', [])
  .controller('ShoppingListController1', ShoppingListController1)
  // .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
  .factory('ShoppingListFactory', ShoppingListFactory)
  .directive('shoppingList', ShoppingListDirective);


  function ShoppingListDirective() {
    var ddo = {
       templateUrl: 'shoppingList.html',
       scope:{
         items:'<',
         title: '@'
       },
      //  controller: 'ShoppingListDirectiveController as list',
      controller: ShoppingListDirectiveController,
       controllerAs: 'list',
       bindToController: true
    };
    return ddo;
  }


  function ShoppingListDirectiveController() {
    var list = this;

    list.cookiesInList = function () {
      for (var i = 0; i < list.items.length; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }
      return false;
    }
  }

  // LIST #1 - controller: unlimited items
  ShoppingListController1.$inject = ['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory) {
    var list = this;

    // use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();
    list.items = shoppingList.getItems();
    var origTile = "Shopping List #1";
    list.title = origTile + " (" + list.items.length + " items)";

    list.itemName = "";
    list.quantity = "";
    // consuming call to service to add item method
    list.addItem = function () {
      shoppingList.addItem(list.itemName, list.quantity);
      list.title = origTile + " (" + list.items.length + " items)";
    }
    // consuming call to service to remove item method
    list.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
      list.title = origTile + " (" + list.items.length + " items)";
    }
  }

  // Service implementation
  // If not specified, maxItems assumed unlimited
  function ShoppingListService(maxItems) {
      var service = this;

      // List of shopping items
      var items = [];

      // Servie method for adding item
      service.addItem = function (itemName, quantity) {
        console.log('inside additem');
        if ((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)) {
          var item = {
            name: itemName,
            quantity: quantity
          };
          items.push(item);
        }else{
          throw new Error("Max Items (" + maxItems +") reached.");
        }
      };

      // Servie method to remove items from list
      service.removeItem = function (itemIndex) {
        console.log('inside removeitem: ', itemIndex);
        items.splice(itemIndex, 1);
      }

      // Servie method to get items
      service.getItems = function () {
        console.log('inside getitems: ', items);
        return items;
      };
  }

  function ShoppingListFactory() {
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    };
    return factory;
  }
})();
