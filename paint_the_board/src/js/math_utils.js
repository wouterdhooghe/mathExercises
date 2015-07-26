/**
 * Created by Italo on 24/05/2015.
 */

function generatePercentual() {
    return generateNumber(0, 100);
}

function generateNumber(lowerLimit, upperLimit) {
    lowerLimit = typeof lowerLimit !== 'undefined' ? lowerLimit : 0;
    upperLimit = typeof upperLimit !== 'undefined' ? upperLimit : 100;
    return lowerLimit + Math.round(Math.random() * (upperLimit - lowerLimit));
}

function isInt(x) {
    var y = parseInt(x, 10);
    return !isNaN(y) && x == y && x.toString() == y.toString();
}

function solve2VariablesEquation(x1, y1, x2, y2) {
    var A = [[x1 * x1, x1], [x2 * x2, x2]];
    var invA = JXG.Math.inverse(A);
    var result = JXG.Math.matMatMult(invA, [[y1], [y2]]);
    return result;
}