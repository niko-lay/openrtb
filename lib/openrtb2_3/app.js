var RtbObject = require('../rtbObject');
var PublisherBuilder = require('./publisher').builder;

var App = function(storeurl, cat, id, name, publisher, bundle, paid, ver, domain){
  this.storeurl = storeurl;
  this.cat = cat;
  this.id = id;
  this.name = name;
  this.bundle = bundle;
  this.publisher = publisher;
  this.paid = paid;
  this.ver = ver;
  this.domain = domain;
};

App.prototype = Object.create(RtbObject.prototype);

var AppBuilder = function(){};

AppBuilder.prototype.storeurl = function(storeurl){
  this._storeurl = storeurl;
  return this;
};

AppBuilder.prototype.cat = function(cat){
  this._cat = cat;
  return this;
};

AppBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

AppBuilder.prototype.name = function(name){
  this._name = name;
  return this;
};

AppBuilder.prototype.bundle = function(bundle){
  this._bundle = bundle;
  return this;
};

AppBuilder.prototype.publisher = function(publisher){
  var builder = new PublisherBuilder();
  this._publisher = builder
                    .id(publisher.id)
                    .name(publisher.name)
                    .build();
  return this;
};

AppBuilder.prototype.paid = function(paid){
  this._paid = paid;
  return this;
};

AppBuilder.prototype.ver = function(ver){
  this._ver = ver;
  return this;
};

AppBuilder.prototype.domain = function(domain){
  this._domain = domain;
  return this;
};

AppBuilder.prototype.build = function() {
  return new App(this._storeurl, this._cat, this._id, this._name, this._publisher, this._bundle, this._paid, this._ver, this._domain).removeUndefined();
};

module.exports = {
  object: App,
  builder: AppBuilder
};