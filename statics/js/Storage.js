var StorageClass = (function(){
    function StorageClass() {
        //do stuff
        //console.log("StorageClass created")
        this.storage=$.localStorage;
    }
    var instance;
    var storage;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new StorageClass();
                // Hide the constructor so the returned objected can't be new'd...
                instance.constructor = null;
            }
            return instance;
        },
   };
})();