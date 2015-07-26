const SIZE_BOARD_COLS = 3;
const SIZE_BOARD_ROWS = 3;

const LIMIT_BOARD_X1 = -1;
const LIMIT_BOARD_Y1 = SIZE_BOARD_ROWS + 1;
const LIMIT_BOARD_X2 = SIZE_BOARD_COLS + 1;
const LIMIT_BOARD_Y2 = -1;

const MINIMUM_COLORS = 5;

const DEBUG = false;

var selectedColor;
var qboard;
var showingSolution;
var spotStateTable;
var spotErrorStateTable;

function Frame(bottomLine, leftLine, topLine, rightLine) {
    this.bottomLine = bottomLine;
    this.leftLine = leftLine;
    this.topLine = topLine;
    this.rightLine = rightLine;
}

function ProblemSpotsState(aX, aY, bX, bY, message) {
    this.aX = aX;
    this.aY = aY;
    this.bX = bX;
    this.bY = bY;
    this.message = message;
}

/**
 * The flow starts here
 */
function generateNewGame(boardName) {
    // 1 - Init all variables
    initVariables();
    setLevelLayers();

    // 2 - Draw the board
    if (qboard != undefined && qboard != null) {
        JXG.JSXGraph.freeBoard(qboard);
    }
    qboard = generateBoard(boardName, LIMIT_BOARD_X1, LIMIT_BOARD_Y1, LIMIT_BOARD_X2, LIMIT_BOARD_Y2, false, true);
    qboard.suspendUpdate();

    // 3 - Generate the specificities
    preparingTable();

    // 4 - Update the board
    qboard.unsuspendUpdate();
    qboard.update();
}

/**
 * This method analises if the final result was reached
 */
function hasFinalResult() {
    var colors = [];
    for (var i = 0; i < SIZE_BOARD_COLS; i++) {
        for (var j = 0; j < SIZE_BOARD_ROWS; j++) {
            if (verifyExistence(spotStateTable[i][j])) {
                colors.push(spotStateTable[i][j].getAttribute('fillColor'));
            } else {
                return false;
            }
        }
    }
    var uniqueColors = [];
    $.each(colors, function (i, el) {
        if ($.inArray(el, uniqueColors) === -1) uniqueColors.push(el);
    });
    if (uniqueColors.length == MINIMUM_COLORS) {
        return true;
    }
    return false;
}

/**
 * This method shows the question's explanation
 */
function showAnswer() {
    showAnswerField(true);

    $("#answerExplanation").html("<b>Solution:</b><br/>" +
        "<p>We can begin to cover the board by diagonal. Note that the 5 spots selected below may not have the same colors in pairs, as they are or in the same row or column or diagonal to the other of the pair.</p>" +
        "<p>Thus, to color these five spots are needed 5 different colors.</p>" +
        "<div class='spaced-v'>" +
        "<div id='answerJXGBox' class='jxgbox center-img'></div>" +
        "</div>" +
        "<p>Thus, the minimum number required of colors to accomplish the task is 5.</p>" +
        "<p>We note, however, that for the remaining spots, we can use these colors to color them without violating constraints. C2 spot, for example, has no restriction regarding the color used in a1. They could have the same color, so. Proceeding similarly to the missing spots, we can paint the way down:</p>" +
        "<div class='spaced-v'>" +
        "<div id='answerJXGBoxAux' class='jxgbox center-img'></div>" +
        "</div>" +
        "<p>We present a color configuration that satisfies the restrictions and with the minimum number of colors of 5. So, this is a possible solution.</p>"
    );

    var answerBoard1 = generateBoard('answerJXGBox', LIMIT_BOARD_X1, LIMIT_BOARD_Y1, LIMIT_BOARD_X2, LIMIT_BOARD_Y2, false, true);
    answerBoard1.suspendUpdate();
    drawAnswer(answerBoard1, false);
    answerBoard1.unsuspendUpdate();
    answerBoard1.update();

    var answerBoard2 = generateBoard('answerJXGBoxAux', LIMIT_BOARD_X1, LIMIT_BOARD_Y1, LIMIT_BOARD_X2, LIMIT_BOARD_Y2, false, true);
    answerBoard2.suspendUpdate();
    drawAnswer(answerBoard2, true);
    answerBoard2.unsuspendUpdate();
    answerBoard2.update();
}

function drawAnswer(board, secondPart) {
    drawTableLines(board);
    drawTableText(board);

    drawText(board, 0.4, 2.5, '1', 25, true, !secondPart ? 'black' : 'red');
    drawText(board, 1.4, 1.5, '2', 25, true);
    drawText(board, 2.4, 0.5, '3', 25, true);
    drawText(board, 2.4, 2.5, '4', 25, true);
    drawText(board, 0.4, 0.5, '5', 25, true);

    if (secondPart) {
        drawText(board, 2.4, 1.5, '1', 25, true, 'red');
        drawText(board, 0.4, 1.5, '3', 25, true);
        drawText(board, 1.4, 0.5, '4', 25, true);
        drawText(board, 1.4, 2.5, '5', 25, true);
    }
}

function initSpotValues() {
    for (var i = 0; i < SIZE_BOARD_COLS; i++) {
        for (var j = 0; j < SIZE_BOARD_ROWS; j++) {
            spotStateTable[i][j] = null;
            spotErrorStateTable[i][j] = null;
        }
    }
}

function initVariables() {
    $("#specialSelect").css("border-color", "blue");
    selectedColor = 'blue';
    showingSolution = false;
    spotStateTable = create2DArray(SIZE_BOARD_COLS);
    spotErrorStateTable = create2DArray(SIZE_BOARD_COLS);
    initSpotValues();

    hideMessage();
    showAnswerField(false);
}

function preparingTable() {
    drawTableLines(qboard);
    drawTableText(qboard);
    settingTableEvents();
}

function drawTableLines(board) {
    var i;
    for (i = 0; i <= SIZE_BOARD_COLS; i++) {
        drawLine(board, [i, 0], [i, SIZE_BOARD_COLS], 'black', null, true);
        drawLine(board, [0, i], [SIZE_BOARD_COLS, i], 'black', null, true);
    }
}

function drawTableText(board) {
    // Draw line text
    drawText(board, -0.2, 2.45, '<strong>1</strong>', 12);
    drawText(board, -0.2, 1.45, '<strong>2</strong>', 12);
    drawText(board, -0.2, 0.45, '<strong>3</strong>', 12);

    // Draw column text
    drawText(board, 0.45, 3.2, '<strong>a</strong>', 12);
    drawText(board, 1.45, 3.2, '<strong>b</strong>', 12);
    drawText(board, 2.45, 3.2, '<strong>c</strong>', 12);
}

function settingTableEvents() {
    // Configuring events to touch and mouse clicks
    qboard.on('down', getPosition);
}

var getPosition = function (evt) {
    var clickedCoords = getMouseClickCoords(evt, qboard);
    var clickX = Math.floor(clickedCoords.usrCoords[1]);
    var clickY = Math.floor(clickedCoords.usrCoords[2]);
    if (DEBUG) logStuff("click on (" + clickX + ", " + clickY + ")");

    if (isInsideLimits(clickX, clickY)) {
        // Removes any error border
        removeAnyErrorBorder();

        if (verifyExistence(spotStateTable[clickX][clickY])) {
            if (spotStateTable[clickX][clickY].getAttribute('fillColor') == selectedColor) {
                removeObjectFromBoard(qboard, spotStateTable[clickX][clickY]);
                spotStateTable[clickX][clickY] = null;
            } else {
                paintNewColorOnBoard(clickX, clickY);
            }
        } else {
            paintNewColorOnBoard(clickX, clickY);
        }

        // Verifies the rules of game
        treatmentOfRules();
    }
};

function treatmentOfRules() {
    var problemSpots = verifyRules();
    if (problemSpots.length > 0) {
        // Mounts the problems message
        var message;
        if (problemSpots.length == 1) {
            message = '<p>The following problem was found:</p>';
        } else {
            message = '<p>The following problems were found:</p>';
        }
        message += '<ul>';

        for (var problemIndex in problemSpots) {
            var problems = problemSpots[problemIndex];
            if (!verifyExistence(spotErrorStateTable[problems.aX][problems.aY])) {
                spotErrorStateTable[problems.aX][problems.aY] = createFrameError(problems.aX, problems.aY);
            }
            if (!verifyExistence(spotErrorStateTable[problems.bX][problems.bY])) {
                spotErrorStateTable[problems.bX][problems.bY] = createFrameError(problems.bX, problems.bY);
            }
            message += '<li>' + problems.message + '</li>';
        }
        message += '</ul>';

        // Reports the problems
        showErrorMessage(message);
    } else {
        hideMessage();

        // Verifies victory condition
        if (hasFinalResult()) {
            showSuccessMessage("You got it. See if your solution is the same like ours.");
            showAnswer();
        } else if (isBoardFilled()) {
            showWarningMessage("You got it but is your answer the best answer?")
        }
    }
}

function isBoardFilled() {
    for (var i = 0; i < SIZE_BOARD_COLS; i++) {
        for (var j = 0; j < SIZE_BOARD_ROWS; j++) {
            if (!verifyExistence(spotStateTable[i][j])) {
                return false;
            }
        }
    }
    return true;
}

function removeAnyErrorBorder() {
    for (var i = 0; i < SIZE_BOARD_COLS; i++) {
        for (var j = 0; j < SIZE_BOARD_ROWS; j++) {
            if (verifyExistence(spotErrorStateTable[i][j])) {
                destroyFrame(qboard, spotErrorStateTable[i][j]);
                spotErrorStateTable[i][j] = null;
            }
        }
    }
}

function createFrameError(x, y) {
    var color = 'red';
    var size = 3;
    var line1 = drawLine(qboard, [x, y], [x + 1, y], color, size);
    var line2 = drawLine(qboard, [x + 1, y], [x + 1, y + 1], color, size);
    var line3 = drawLine(qboard, [x + 1, y + 1], [x, y + 1], color, size);
    var line4 = drawLine(qboard, [x, y + 1], [x, y], color, size);
    return new Frame(line1, line2, line3, line4);
}

function destroyFrame(board, frame) {
    removeObjectFromBoard(board, frame.bottomLine);
    removeObjectFromBoard(board, frame.leftLine);
    removeObjectFromBoard(board, frame.topLine);
    removeObjectFromBoard(board, frame.rightLine);
}

function paintNewColorOnBoard(x, y) {
    var square = drawSquare(qboard, [x, y], [x, y + 1], [x + 1, y + 1], [x + 1, y], true, selectedColor);
    if (verifyExistence(spotStateTable[x][y])) {
        removeObjectFromBoard(qboard, spotStateTable[x][y]);
        spotStateTable[x][y] = null;
    }
    spotStateTable[x][y] = square;
    if (DEBUG) logStuff(square.getAttribute('fillColor') + " square drawn");
}

function verifyRules() {
    var problemSpots = [];
    problemSpots = problemSpots.concat(verifyCols());
    problemSpots = problemSpots.concat(verifyRows());
    problemSpots = problemSpots.concat(verifyDiagonals());
    return problemSpots;
}

function verifyCols() {
    var problemSpots = [];
    for (var i = 0; i < SIZE_BOARD_COLS; i++) {
        for (var j = 0; j < SIZE_BOARD_ROWS - 1; j++) {
            for (var k = j + 1; k < SIZE_BOARD_ROWS; k++) {
                problemSpots = problemSpots.concat(getProblemSpot("column", i, k, i, j));
            }
        }
    }
    return problemSpots;
}

function verifyRows() {
    var problemSpots = [];
    for (var j = 0; j < SIZE_BOARD_ROWS; j++) {
        for (var i = 0; i < SIZE_BOARD_COLS - 1; i++) {
            for (var k = i + 1; k < SIZE_BOARD_COLS; k++) {
                problemSpots = problemSpots.concat(getProblemSpot("row", i, j, k, j));
            }
        }
    }
    return problemSpots;
}

function verifyDiagonals() {
    var problemSpots = [];
    for (var i = 0; i < SIZE_BOARD_COLS - 1; i++) {
        for (var k = i + 1; k < SIZE_BOARD_COLS; k++) {
            // Verifies main diagonal
            problemSpots = problemSpots.concat(getProblemSpot("diagonal", i, i, k, k));

            // Verifies opposite diagonal
            problemSpots = problemSpots.concat(getProblemSpot("diagonal", i, SIZE_BOARD_COLS - 1 - i, k, SIZE_BOARD_COLS - 1 - k));
        }
    }
    return problemSpots;
}

function getProblemSpot(typeRule, xA, yA, xB, yB) {
    var problemSpots = []
    var spotA, spotB;
    var colorA, colorB;
    spotA = spotStateTable[xA][yA];
    spotB = spotStateTable[xB][yB];
    if (verifyExistence(spotA) && verifyExistence(spotB)) {
        colorA = spotA.getAttribute('fillColor');
        colorB = spotB.getAttribute('fillColor');
        if (colorA == colorB) {
            problemSpots = problemSpots.concat(new ProblemSpotsState(xA, yA, xB, yB, "The squares '" + getPositionAlias(xA, yA) + "' and '" + getPositionAlias(xB, yB) + "' are in the same " + (typeRule) + " and have the same color " + (colorA) + "."));
            if (DEBUG) logStuff(typeRule + "'s rule was broken. repeated colors appeared (" + colorA + ") when comparing '" + getPositionAlias(xA, yA) + "' with '" + getPositionAlias(xB, yB) + "'.");
        }
    }
    return problemSpots;
}

function getPositionAlias(col, row) {
    var alias = '';
    if (col == 0) {
        alias += 'a';
    } else if (col == 1) {
        alias += 'b';
    } else {
        alias += 'c';
    }
    if (row == 0) {
        alias += '3';
    } else if (row == 1) {
        alias += '2';
    } else {
        alias += '1';
    }
    return alias;
}

function isInsideLimits(x, y) {
    return x >= 0 && x < SIZE_BOARD_COLS && y >= 0 && y < SIZE_BOARD_ROWS;
}