var RtbObject = require('../rtbObject');
var RtbObject = require('../rtbObject');
var NativeBuilder = require('./native').builder;
var BannerBuilder = require('./banner').builder;

var Imp = function(id, bidfloor, tagid, native, banner, bidfloorcur, instl, displaymanager){
  this.id = id;
  this.bidfloor = bidfloor;
  this.tagid = tagid;
  this.native = native;
  this.banner = banner;
  this.bidfloorcur = bidfloorcur;
  this.instl = instl;
  this.displaymanager = displaymanager;
};

Imp.prototype = Object.create(RtbObject.prototype);

var ImpBuilder = function(){};

ImpBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

ImpBuilder.prototype.bidfloor = function(bidfloor, bidfloorcur){
  this._bidfloor = bidfloor;
  this._bidfloorcur = (bidfloorcur || "USD");
  return this;
};

ImpBuilder.prototype.tagid = function(tagid){
  this._tagid = tagid;
  return this;
};

ImpBuilder.prototype.instl = function(instl){
    this._instl = instl;
    return this;
};

ImpBuilder.prototype.displaymanager = function(displaymanager){
    this._displaymanager = displaymanager;
    return this;
};

ImpBuilder.prototype.native = function(native){
  var builder = new NativeBuilder();
  this._native = builder
                .request(native.request)
                .ver(native.ver)
                .api(native.api)
                .battr(native.battr)
                .ext(native.ext)
                .build();
  return this;
};

ImpBuilder.prototype.banner = function(banner){
  var builder = new BannerBuilder();
  this._banner = builder
                .w(banner.w)
                .h(banner.h)
                .wmax(banner.wmax)
                .hmax(banner.hmax)
                .wmin(banner.wmin)
                .hmin(banner.hmin)
                .id(banner.id)
                .btype(banner.btype)
                .battr(banner.battr)
                .pos(banner.pos)
                .mimes(banner.mimes)
                .topframe(banner.topframe)
                .expdir(banner.expdir)
                .api(banner.api)
                .ext(banner.ext)
                .build();
  return this;
};

ImpBuilder.prototype.build = function() {
  return new Imp(this._id, this._bidfloor, this._tagid, this._native, this._banner, this._bidfloorcur, this._instl, this._displaymanager).removeUndefined();
};

module.exports = {
  object: Imp,
  builder: ImpBuilder
};