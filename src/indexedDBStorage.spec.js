describe("Storage", function() {
  var storage;
  beforeEach(function() {
    storage = new Storage("myTestStorage");
  });


  it("Can hold key value pairs", function() {
    var done = false;
    storage.put("key", "value", {
      onsuccess: function() {
        done = true;
      },
      onerror: function() {}
    });
    setTimeout(function() {
      return done;
    }, "put timed out", 5000);
  });

  it("A value can be retrieved using its' key", function() {
    storage.get("key", {
      onsuccess: function(foundValue) {
        expect(foundValue).toEqual("value");
      },
      onerror: function(event) {
        console.error(event.target.error)
      }
    });
  });

  it("A key value pair can be removed", function() {
    var done = false;
    storage.remove("key", {
      onsuccess: function() {
        done = true;
      },
      onerror: function() {}
    });
    setTimeout(function() {
      return done;
    }, "remove timed out", 500);
  });

  it("An existing key gets its' value replaced", function() {
    var done = false;
    storage.put("key", "value", {
      onsuccess: function() {
        done = false;
      },
      onerror: function() {}
    });
    setTimeout(function() {
      return done;
    }, "put timed out", 500);

    done = false;
    storage.put("key", "newValue", {
      onsuccess: function() {
        done = true;
      },
      onerror: function() {}
    });

    storage.get("key", function(foundValue) {
      expect(foundValue).toEqual("newValue");
    });
  });
});

