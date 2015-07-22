var Q = require('q');

function createDbWrapper(db, options) {
  if (!db)
    throw new Error("Must pass nano db as first argument");
  if (!db.insert && !db.request)
    throw new Error("Not a nano db");

  if (!options) {
    options = {};
  }

  if (options.wrapError === undefined) {
    options.wrapError = true;
  } 


  return {
    view: function(designname, viewname, params) {
      var deferred = Q.defer();

        if (options.logRequest) {
          console.log("view(%j, %j, %j)", designname, viewname, params);
      }
      db.view(designname, viewname, params, function(err, body) {
          if (err) {
              deferred.reject(options.wrapError ? new Error(err) : err);
          } else {
              deferred.resolve(body);
          }
      });

      return deferred.promise;
    },
    bulk: function(docs, params) {
      if (docs.length === 0)
          return Q.resolve(docs);

      var deferred = Q.defer();

        if (options.logRequest) {
          console.log("bulk([%j], %j)", docs.length, params);
        }

      db.bulk({ docs: docs }, function(err, body) {
          if (err) {
              deferred.reject(options.wrapError ? new Error(err) : err);
          } else {
              deferred.resolve(body);
          }
      });

      return deferred.promise;
    }
  };
}


module.exports = createDbWrapper;