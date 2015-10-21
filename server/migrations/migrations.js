// this file migrates the api to neo4j

// YOU ONLY NEED TO RUN LINE 35 - 38 TO SAVE DRINKS TO NEO4J

// var express = require('express');

var saveDrink = require('../models/drinks.js').saveDrink;

//drink files
var drinksTo1000 = require('./drinks1-1000.js');
var drinksTo2000 = require('./drinks1000-2000.js');
var drinksTo3000 = require('./drinks2000-3000.js');
var drinksTo3550 = require('./drinks3000-3575.js');

// recursively counts linked list data and logs each drink name
var forEach = function (list, count) {
  count = count || 0;
  for (var i = 0; i < list.drinks.length; i++) {
    saveDrink(list.drinks[i]);
    // console.log("drink obj", list.drinks[i]);
  }
  count += list.drinks.length;
  if (list.next) {
    forEach(list.next.next, count);
  } else {
    console.log(count);
    return count;
  }
};

/*********** save each drink to db *************/
// forEach(drinksTo1000.start);
// forEach(drinksTo2000.start);
// forEach(drinksTo3000.start);
// forEach(drinksTo3550.start);


/****************** api request to write data files ************************/
// DON'T NEED TO RUN UNLESS 
var request = require('request');
var fs = require('fs');

// api endPoints used for creatLinkedList endPoint/targetUrl parameters
var absolutEndPoint1 = 'https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a';
var absolutEndPoint1000 = "https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a&start=1000&pageSize=25";
var absolutEndPoint2000 = "https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a&start=2000&pageSize=25";
var absolutEndPoint3000 = "https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a&start=3000&pageSize=25";
var absolutEndPoint3550 = "https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a&start=3550&pageSize=25";


//LinkedList constructor
function List(){
  this.start = null; 
  this.end = null;
  this.add = function (data){
    if(this.start === null && this.end === null){ 
      this.start = List.makeNode(data); 
      this.end = this.start;
    } else if (this.end === this.start) {
      this.end = List.makeNode(data);
      this.start.next = this.end;
    } else {
      this.end.next = List.makeNode(data);
      this.end = this.end.next;
    }
  };
}

List.makeNode = function(list){ 
  return {
    drinks: list,
    next: null
  };
};

var data = new List();

// This function makes recursive calls to the api endpoint until targetUrl is reached 
// usually used to retrieve 1000 drinks and stored in datastructure to write files
function createLinkedList (endPoint, targetUrl) {
  var list = [];
  var nextUrl;
  var obj;
  request(endPoint, function (error, response, json) {
    obj = JSON.parse(json);
    nextUrl = obj.next;
    for (var i = 0; i < obj.result.length; i++) {
      list.push({name: obj.result[i].name});
    }
    data.add(list);
    console.log(list, nextUrl);
    if (nextUrl === undefined || nextUrl === targetUrl) {
      fs.writeFile(__dirname + '/data.json', JSON.stringify(data) , function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + './data.json');
        }
      });
      return;
    }
    data.add(createLinkedList(nextUrl, targetUrl));
  });
}

// invoked functions here
// createLinkedList(absolutEndPoint1, absolutEndPoint1000);
// createLinkedList(absolutEndPoint1000, absolutEndPoint2000);
// createLinkedList(absolutEndPoint2000, absolutEndPoint3000);

