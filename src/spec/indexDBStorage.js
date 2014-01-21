describe("Storage", function () {
    var storage;
    beforeEach(function () {
        storage = new Storage("myTestStorage");
    })


    it("Can hold key value pairs", function () {
        var done = false;
        storage.put("key", "value", {
            onsuccess: function () {
                done = true;
            },
            onerror: function () {
            }
        });
        waitsFor(function () {
            return done;
        }, "put timed out", 5000);

    });

    it("A value can be retrieved using its' key", function () {
        var value;
        var done = false;
        storage.get("key", {
            onsuccess: function (foundValue) {
                value = foundValue;
                done = true;
            },
            onerror: function (event) {
                console.error(event.target.error)
            }});
        waitsFor(function () {
            return done;
        }, "The function didn't return in time", 500);

        runs(function () {
            expect(value).toEqual("value");
        });


    });

    it("A key value pair can be removed", function () {
        var done = false;
        storage.remove("key", {
            onsuccess: function () {
                done = true;
            },
            onerror: function () {
            }
        });
        waitsFor(function () {
            return done;
        }, "remove timed out", 500);
    });

    it("An existing key gets its' value replaced"), function () {
        var done = false;
        storage.put("key", "value", {
            onsuccess: function () {
                console.log("here");
                done = false;
            },
            onerror: function () {
            }
        });
        waitsFor(function () {
            return done;
        }, "put timed out", 500);

        done = false;
        storage.put("key", "newValue", {
            onsuccess: function () {
                done = true;
            },
            onerror: function () {
            }
        });
        waitsFor(function () {
            return done;
        }, "put timed out", 500);

        var value;
        done = false;
        storage.get("key", function (foundValue) {
            value = foundValue;
            done = true;
        });
        waitsFor(function () {
            return done;
        }, "The function didn't return in time", 500);

        runs(function () {
            expect(value).toEqual("newValue");
        });
    }

});