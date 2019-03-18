"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = input => input.trim();
exports.trimLeft = input => input.trimLeft();
exports.trimRight = input => input.trimRight();
exports.toLowerCase = input => input.toLowerCase();
exports.toUpperCase = input => input.toUpperCase();
exports.truncate = (input, n) => String(input).slice(0, n);
exports.wordRegex = /(?:^|\s)\S/g;
exports.sentenceRegex = /(?:^|\.\s)\S/g;
var capitalizeConst;
(function (capitalizeConst) {
    capitalizeConst["words"] = "words";
    capitalizeConst["sentences"] = "sentences";
    capitalizeConst["first"] = "first";
})(capitalizeConst = exports.capitalizeConst || (exports.capitalizeConst = {}));
exports.capitalize = (input, type) => {
    if (type === capitalizeConst.words) {
        return input.replace(exports.wordRegex, s => s.toUpperCase());
    }
    else if (type === capitalizeConst.sentences) {
        return input.replace(exports.sentenceRegex, s => s.toUpperCase());
    }
    else if (type === capitalizeConst.first) {
        return input[0].toUpperCase() + input.slice(1);
    }
    return input;
};
