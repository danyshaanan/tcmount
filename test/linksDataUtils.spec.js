"use strict";

var rek = require('rekuire');
var linksDataUtils = rek('linksDataUtils');

var linkData = {
    "source": __dirname,
    "target": "user@server:/directory/anotherdirectory"
};

describe("linksDataUtils:", function() {
    var formattedLinkData;

    describe("format:", function() {
        it("should returned a formatted link data", function() {
            formattedLinkData = linksDataUtils.format(linkData);
            expect(formattedLinkData.source.match(/\/$/)).toBeTruthy();
            expect(formattedLinkData.target.match(/\/$/)).toBeTruthy();
        });
    });

    describe("varify:", function() {
        it("should return true of the example data", function() {
            var varifyResult = linksDataUtils.varify(formattedLinkData);
            expect(varifyResult).toBeTruthy();
        });
    });

});