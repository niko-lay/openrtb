var RtbObject = function(){};

RtbObject.prototype.stringify = function(){
  return JSON.stringify(this);
};

RtbObject.prototype.removeUndefined = function(){
	for (var prop in this) {
            if (this.hasOwnProperty(prop) && typeof this[prop] === 'object'){
                removeUndefinedChild(this[prop]);
            }
            if (this.hasOwnProperty(prop) && typeof this[prop] === 'undefined') {
                delete this[prop];
            }
    }
    return this;
};

RtbObject.prototype.removeNulls = function(){
	for (var prop in this) {
            if (this.hasOwnProperty(prop) && typeof this[prop] === 'object'){
                removeNullInChild(this[prop]);
            }
        if (this.hasOwnProperty(prop) && this[prop] === null) {
            delete this[prop];
        }
    }
    return this;
};

var removeNullInChild = function(obj){
    if (typeof obj !== 'object')
        return;

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && (obj[prop] === null || typeof obj[prop] === 'null') ){
            delete obj[prop];
        }

    }
};

var removeUndefinedChild = function(obj){
    if (typeof obj !== 'object')
        return;

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && (obj[prop] === undefined || typeof obj[prop] === 'undefined') ){
            delete obj[prop];
        }

    }
};

module.exports = RtbObject;