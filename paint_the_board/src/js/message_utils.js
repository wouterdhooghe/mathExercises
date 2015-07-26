/**
 * Created by Italo on 17/07/2015.
 */

function showSuccessMessage(message) {
    showMessage("<span class=\"dark-green glyphicon glyphicon-ok\" aria-hidden=\"true\" style=\"top: 2px;\"></span><span class=\"dark-green\">Congratulations!</span> " + message);
}

function showWarningMessage(message) {
    showMessage("<span class=\"dark-yellow glyphicon glyphicon-warning-sign\" aria-hidden=\"true\" style=\"top: 2px;\"></span><span class=\"dark-yellow\"> Warning!</span> " + message);
}

function showErrorMessage(message) {
    showMessage("<span class=\"dark-red glyphicon glyphicon-remove\" aria-hidden=\"true\" style=\"top: 2px;\"></span><span class=\"dark-red\">Be careful!</span> " + message);
}

function showMessage(message) {
    $("#messageContainer").attr("style", "display: block;");
    $("#message").html(message);
    var div = document.getElementById("messageContainer");
    div.focus();
    div.scrollIntoView(false);
}

function showAnswerField(bool) {
    $("#showAnswer").attr("disabled", bool);
    $("#answerExplanation").toggleClass("hidden", !bool);
}

function hideMessage() {
    $("#messageContainer").attr("style", "display: none;");
}