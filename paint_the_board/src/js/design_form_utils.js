/**
 * Created by Italo on 26/05/2015.
 */

/**
 * layer : { point : 9, arc : 8, line : 7, circle : 6, curve : 5, polygon : 4, sector : 3, angle : 2, grid : 1, image : 0 }
 */
function setLevelLayers() {
    //JXG.Options.layer['polygon'] = 10;
}

/**
 * This method draws a board with the features specified. It returns a reference to the board created.
 */
function generateBoard(boardName, x1, y1, x2, y2, hasAxis, hasGrid, keepRatio) {
    hasAxis = verifyExistence(hasAxis) ? hasAxis : false;
    hasGrid = verifyExistence(hasGrid) ? hasGrid : false;
    keepRatio = verifyExistence(keepRatio) ? keepRatio : true;
    var board = JXG.JSXGraph.initBoard(boardName, {
        axis: hasAxis,
        boundingbox: [x1, y1, x2, y2],
        keepaspectratio: keepRatio,
        showcopyright: false,
        grid: hasGrid
    });
    return board;
}


function drawText(board, x, y, text, fontSize, fixed, color) {
    board = verifyExistence(board) ? board : qboard;
    fixed = verifyExistence(fixed) ? fixed : true;
    fontSize = verifyExistence(fontSize) ? fontSize : 12;
    color = verifyExistence(color) ? color : 'black';
    return board.create('text', [x, y, text], {
        fixed: fixed,
        fontSize: fontSize,
        fillColor: color,
        strokeColor: color
    });
}

function drawLine(board, p1, p2, color, strokeWidth, fixed) {
    board = verifyExistence(board) ? board : qboard;
    color = verifyExistence(color) ? color : 'blue';
    strokeWidth = verifyExistence(strokeWidth) ? strokeWidth : 1;
    fixed = verifyExistence(fixed) ? fixed : true;
    return board.create('line', [p1, p2], {
        strokeColor: color,
        strokeWidth: strokeWidth,
        straightFirst: false,
        straightLast: false,
        fixed: fixed
    });
}

function drawImage(url, x, y, w, h, fixed, board, name) {
    fixed = verifyExistence(fixed) ? fixed : true;
    board = verifyExistence(board) ? board : qboard;
    name = verifyExistence(name) ? name : '';
    return board.create('image', [url, [x, y], [w, h]], {
        fixed: fixed,
        name: name
    });
}

function drawPoint(board, p, name, size, visible, fixed) {
    board = verifyExistence(board) ? board : qboard;
    name = verifyExistence(name) ? name : '';
    size = verifyExistence(size) ? size : 0;
    visible = verifyExistence(visible) ? visible : true;
    fixed = verifyExistence(fixed) ? fixed : true;
    return board.create('point', [p[0], p[1]], {
        name: name,
        size: size,
        visible: visible,
        fixed: fixed
    });
}

function drawSquare(board, p1, p2, p3, p4, fixed, color, opacity) {
    board = verifyExistence(board) ? board : qboard;
    fixed = verifyExistence(fixed) ? fixed : true;
    color = verifyExistence(color) ? color : 'green';
    opacity = verifyExistence(opacity) ? opacity : 1;
    var p = [drawPoint(board, p1, '', 0, false), drawPoint(board, p2, '', 0, false), drawPoint(board, p3, '', 0, false), drawPoint(board, p4, '', 0, false)];
    return board.createElement('polygon', p, {
        fillColor: color,
        fillOpacity: opacity,
        highlightFillColor: color,
        highlightFillOpacity: 1,
        strokeColor: 'black',
        strokeOpacity: 1,
        strokeWidth: 2
    });
}

function drawParable(a, b, c, minorRange, majorRange, board) {
    board = verifyExistence(board) ? board : qboard;
    return board.createElement('functiongraph', [function (t) {
        return a * t * t + b * t + c;
    },
        minorRange, majorRange
    ]);
}

function removeObjectFromBoard(board, obj) {
    board = verifyExistence(board) ? board : qboard;
    board.suspendUpdate();
    board.removeObject(obj);
    board.unsuspendUpdate();
}

function verifyExistence(obj) {
    return typeof obj !== 'undefined' && obj !== 'undefined' && obj !== null;
}