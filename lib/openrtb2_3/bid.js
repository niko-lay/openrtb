var Promise = require('bluebird');
var RtbObject = require('../rtbObject');
var replaceMacros = require('../utils').replaceMacros;

var Bid = function(status, nurl, adm, adid, adomain, id, price, cid, clearPrice, crid, iurl, impid, ext){
  this.status = status;
  this.nurl = nurl;
  this.adm = adm;
  this.adid = adid;
  this.adomain = adomain;
  this.id = id;
  this.price = price;
  this.cid = cid;
  this.clearPrice = clearPrice;
  this.crid = crid;
  this.iurl = iurl;
  this.impid = impid;
  this.ext = ext;
};

Bid.prototype = Object.create(RtbObject.prototype);

Bid.prototype.replaceMacros = function(valuesMap){
  return new Promise(function (resolve, reject) {
    valuesMap = valuesMap || {};

    if (!this.clearPrice){
      return reject(new Error('Cannot replace macros without a clear price'));
    }

    // Set default values if values are not passed
    valuesMap['${AUCTION_PRICE}'] = valuesMap['${AUCTION_PRICE}'] || encodeURIComponent(this.clearPrice);
    valuesMap['${AUCTION_ID}'] = valuesMap['${AUCTION_ID}'] || '${AUCTION_ID}'; // if not passed do not replace it
    valuesMap['${AUCTION_BID_ID}'] = valuesMap['${AUCTION_BID_ID}'] || encodeURIComponent(this.id);
    valuesMap['${AUCTION_IMP_ID}'] = valuesMap['${AUCTION_IMP_ID}'] || encodeURIComponent(this.impid);

    if (this.nurl) {
      this.nurl = replaceMacros(this.nurl, valuesMap);
    }
    this.adm = replaceMacros(this.adm, valuesMap)

    resolve(this);
  }.bind(this))
};

var BidBuilder = function(){};

BidBuilder.prototype.status = function(status){
  this._status = status;
  return this;
};

BidBuilder.prototype.nurl = function(nurl){
  this._nurl = nurl;
  return this;
};

BidBuilder.prototype.adm = function(adm){
  this._adm = adm;
  return this;
};

BidBuilder.prototype.adid = function(adid){
  this._adid = adid;
  return this;
};

BidBuilder.prototype.adomain = function(adomain){
  this._adomain = adomain;
  return this;
};

BidBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

BidBuilder.prototype.price = function(price){
  this._price = price;
  return this;
};

BidBuilder.prototype.cid = function(cid){
  this._cid = cid;
  return this;
};

BidBuilder.prototype.clearPrice = function(clearPrice){
  this._clearPrice = clearPrice;
  return this;
};

BidBuilder.prototype.crid = function(crid){
  this._crid = crid;
  return this;
};

BidBuilder.prototype.iurl = function(iurl){
  this._iurl = iurl;
  return this;
};

BidBuilder.prototype.impid = function(impid){
  this._impid = impid;
  return this;
};

BidBuilder.prototype.ext = function(ext){
  this._ext = ext;
  return this;
};

BidBuilder.prototype.build = function() {
  return new Promise(function (resolve, reject) {
      resolve(new Bid(
        this._status,
        this._nurl,
        this._adm,
        this._adid,
        this._adomain,
        this._id,
        this._price,
        this._cid,
        this._clearPrice,
        this._crid,
        this._iurl,
        this._impid,
        this._ext
      ).removeUndefined());
  }.bind(this));
};

module.exports = {
  object: Bid,
  builder: BidBuilder  
};