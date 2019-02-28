import Overlayer from '../src/layers/overlay';
// var assert = require('assert');

describe('overlay.js', function(){
    it('it should have map instance,', function() {
        var overlay = new Overlayer({ map: {} });
        expect(overlay.map).not.toBe(undefined);
    })
})
