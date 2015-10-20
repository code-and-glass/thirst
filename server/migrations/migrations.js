var express = require('express');
var path = require('path');

// var db = require('../database.js');
// var drinkModel = require('../models/drinks.js');

var request = require('request');
var fs = require('fs');

// api endPoints used for creatLinkedList endPoint/targetUrl parameters
var absolutEndPoint = {
  1: 'https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a',
  1000: "https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a&start=1000&pageSize=25",
  2000: "https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a&start=2000&pageSize=25",
  3000: "https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a&start=3000&pageSize=25",
  3550: "https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a&start=3550&pageSize=25"
};

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
  if (endPoint === targetUrl) {
    fs.writeFile(__dirname + '/data.json', JSON.stringify(data) , function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + './data.json');
      }
    });
    return;
  }
  var list = [];
  var nextUrl;
  request(endPoint, function (error, response, json) {
    var obj = JSON.parse(json);
    for (var i = 0; i < obj.result.length; i++) {
      list.push({name: obj.result[i].name});
    }
    nextUrl = obj.next;
    data.add(list);
    console.log("names are", list);
    if (nextUrl === undefined) {
      fs.writeFile(__dirname + '/data.json', JSON.stringify(data) , function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + './data.json');
        }
      });
      return;
    }
    data.add(createLinkedList(nextUrl, target));
    console.log("nextUrl is", nextUrl);
    console.log("data is", data);
  });
}
// invoke function here
// createLinkedList(absolutEndPoint.3000);

// recursively counts linked list data and logs each drink name
var forEach = function (list, count) {
  count = count || 0;
  for (var i = 0; i < list.drinks.length; i++) {
    // console.log(list.drinks[i].name);
  }
  count += list.drinks.length;
  if (list.next) {
    forEach(list.next.next, count);
  } else {
    console.log(count);
    return count;
  }
};

