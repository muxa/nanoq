var should = require('chai').should(),
	expect = require('chai').expect,
    nanoq = require('../lib/nanoq');

describe('#module', function() {
  it('should be a function', function() {
    nanoq.should.be.an('function');
  });
});

function createMockDb() {
	return { 
   			insert: function(){},
   			request: function(){}
   		};
}

describe('#nanoq', function() {
  it('should require first argument', function() {
    expect(function() {
   		nanoq();
    }).to.throw(Error);
  });

  it('should require nono db as first argument', function() {
    expect(function() {
   		nanoq(createMockDb());
    }).to.not.throw(Error);
  });

	describe('view', function() {
	  it('should be a function', function() {
   		var db = nanoq(createMockDb());
   		db.view.should.be.an('function');
	  });
	});

	describe('bulk', function() {
	  it('should be a function', function() {
   		var db = nanoq(createMockDb());
   		db.bulk.should.be.an('function');
	  });
	});

});
