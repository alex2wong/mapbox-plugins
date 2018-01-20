var assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function(){
        it('should return -1 when the val is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
        })
    })
})