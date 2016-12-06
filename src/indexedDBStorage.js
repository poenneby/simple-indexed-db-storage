function Storage(name) {

  this.dbName = name;

  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  this.executeOnObjectStore = function(store_name, mode, action) {
    var request = window.indexedDB.open(this.dbName, 3);

    request.onupgradeneeded = function(event) {
      db = this.result;

      // Create an objectStore for this database
      db.createObjectStore(store_name);
    };

    request.onsuccess = function(event) {
      var db = this.result;
      var tx = db.transaction(store_name, mode);
      tx.oncomplete = function(event) {
      }
      tx.onerror = function(event) {
      }
      var objectStore = tx.objectStore(store_name);
      action(objectStore);
      tx.onsuccess
    }

    request.onerror = function(event) {
    }
  }

  this.remove = function(key, callbacks) {
    this.executeOnObjectStore("name", "readwrite", function(objectStore) {
      var request = objectStore.delete(key);
      request.onsuccess = function(event) {
        callbacks.onsuccess();
      }
      request.onerror = function(event) {
        callbacks.onerror();
      }
    });
  }

  this.put = function(key, value, callbacks) {
    // copy the function scope so we can call remove and executeOnObjectStore in the callback!
    var _this = this;
    this.executeOnObjectStore("name", "readwrite", function(objectStore) {

      // replace = delete + add
      _this.remove(key, {
        onsuccess: function() {
          _this.executeOnObjectStore("name", "readwrite", function(objectStore) {
            var request = objectStore.add({
              value: value
            }, key);
            request.onsuccess = function(event) {
              callbacks.onsuccess();
            }
            request.onerror = function(event) {
              callbacks.onerror();
            }
          })
        },
        onerror: function() {
          callbacks.onerror();
        }
      });
    });
  }

  this.get = function(key, callbacks) {
    this.executeOnObjectStore("name", "readwrite", function(objectStore) {
      var request = objectStore.get(key);
      request.onsuccess = function(event) {
        if (event.target.result === undefined) {
          callbacks.onsuccess("");
        } else {
          callbacks.onsuccess(event.target.result.value);
        }
      }
      request.onerror = function(event) {
        callbacks.onerror(event);
      }
    });
  }


}

