function VirtualDevice() {
}

// implementation of OnOff

VirtualDevice.prototype.getOnOff = function() {
  console.log('getOnOff was called!');
}

VirtualDevice.prototype.setOnOff = function(arg0) {
  console.log('setOnOffcc was called!');
}

var i = 3;
i = 4;

return new VirtualDevice()