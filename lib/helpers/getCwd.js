"use strict";

// i use this wrapper object, so i could mock it in the tests
module.exports = function(){
    return process.cwd();
};
