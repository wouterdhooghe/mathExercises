/**
 * Created by Italo on 16/07/2015.
 */

function whichButton(e) {
    var sTestEventType = 'mouseup';
    var sTestEventTypeIE = 'pointerup';
    var evt = (e == null ? event : e);
    var clickType = 'LEFT';

    if (evt.type != sTestEventType && evt.type != sTestEventTypeIE) return 'NONE';
    if (evt.which) {
        if (evt.which == 3) clickType = 'RIGHT';
        if (evt.which == 2) clickType = 'MIDDLE';
    } else if (evt.button) {
        if (evt.button == 2) clickType = 'RIGHT';
        if (evt.button == 4) clickType = 'MIDDLE';
    }
    if (DEBUG) logStuff(evt + " " + evt.type + ': ' + clickType + ' button!');
    return clickType;
}

function isLeftButton(e) {
    return whichButton(e) === 'LEFT';
}

function isRigthButton(e) {
    return whichButton(e) === 'RIGHT';
}

function getMouseClickCoords(evt, board) {
    var i;
    if (evt[JXG.touchProperty]) {
        // index of the finger that is used to extract the coordinates
        i = 0;
    }
    var cPos = board.getCoordsTopLeftCorner(evt, i),
        absPos = JXG.getPosition(evt, i),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
}