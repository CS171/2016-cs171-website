function yetAnotherObject() {
    return {
        x: 3,
        get: function () {
            return this.x
        }
    };
}

obj = yetAnotherObject()
console.log(obj.get()); // fine
var t = obj.get;
console.log(t()); // *NOT* fine