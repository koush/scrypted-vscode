function VirtualDevice() {
}

// implementation of OnOff

VirtualDevice.prototype.getOnOff = function() {
  console.log('getOnOff was called!');
}

VirtualDevice.prototype.setOnOff = function(arg0) { 
 console.log('setOnOff was called!');
}

return new VirtualDevice()