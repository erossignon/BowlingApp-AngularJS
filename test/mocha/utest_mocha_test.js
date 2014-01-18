var bowling = require("../../Bowling");
expect = require("expect.js");

// fixing discrepancies between jasmine expect and expect.js
expect.Assertion.prototype.toBe = function(a) {
   this.to.be(a);
};
expect.Assertion.prototype.toThrow = function() {
  this.to.throwException();
};
expect.Assertion.prototype.toBeDefined = function() {
  this.to.be.an("object");
};

BowlingCtrl = bowling.BowlingCtrl;
Player      = bowling.Player;
Game        = bowling.Game;
require("../Bowling_test.js");
