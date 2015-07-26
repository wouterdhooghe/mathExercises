/**
 * Created by Italo on 11/07/2015.
 */

function isArraysEqual(a, b) {
    var i, j, equals = 0;
    for (i = 0; i < a.length; i++) {
        for (j = 0; j < b.length; j++) {
            if (a[i][0] == b[j][0] && a[i][1] && b[j][1]) {
                equals++;
            }
        }
    }
    if (a.length == equals) {
        return true;
    }
    return false;
}

function arrayContains(a, b) {
    var i;
    for (i = 0; i < a.length; i++) {
        if (a[i][0] == b[0] && a[i][1] == b[1]) {
            return true;
        }
    }
    return false;
}

function create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}