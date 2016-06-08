var expect = chai.expect;

describe('Array', function() {
  it('should start empty', function() {
    var array = [];
    expect(array).to.have.lengthOf(0);
  });
});
