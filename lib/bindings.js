'use strict';
var fs= require('fs');
var bindings = null;
if(process.platform == "linux"){
  if(fs.existsSync(__dirname+"/../Release/"+process.arch+"/serialport.node")){
    try {
      bindings = require(__dirname+"/../Release/"+process.arch+"/serialport.node");
    } catch (error) {
      console.error("Init SerialPort", error);
      bindings = require('bindings')('serialport.node');
    }
  }else{
    bindings = require('bindings')('serialport.node');
  }
      
}else{
  bindings = require('bindings')('serialport.node');
}

var listUnix = require('./list-unix');

var linux = process.platform !== 'win32' && process.platform !== 'darwin';

function listLinux(callback) {
  callback = callback || function(err) {
    if (err) { this.emit('error', err) }
  }.bind(this);
  return listUnix(callback);
};

var platformOptions = {};
if (process.platform !== 'win32') {
  platformOptions = {
    vmin: 1,
    vtime: 0
  };
}

module.exports = {
  close: bindings.close,
  drain: bindings.drain,
  flush: bindings.flush,
  list: linux ? listLinux : bindings.list,
  open: bindings.open,
  SerialportPoller: bindings.SerialportPoller,
  set: bindings.set,
  update: bindings.update,
  write: bindings.write,
  platformOptions: platformOptions
};
