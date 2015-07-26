/**
 * Created by Italo on 26/05/2015.
 */

function removeJsxPointFromList(list, point) {
    list.splice(getJsxPointFromList(list, point), 1);
}

function getJsxPointFromList(list, point) {
    var indexOnChosenJsxPoints = -1;
    for (var j = 0; j < list.length; j++) {
        if (point.X() === list[j].X() &&
            point.Y() === list[j].Y()) {
            indexOnChosenJsxPoints = j;
        }
    }
    return indexOnChosenJsxPoints;
}