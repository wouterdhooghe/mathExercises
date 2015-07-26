/**
 * Created by Italo on 26/05/2015.
 */

function logStuff(userData) {
    if (typeof userData === "string") {
        console.log(userData);
    }
    else if (typeof userData === "object") {
        for (var item in userData) {
            console.log(item + ": " + userData[item]);
        }
    }
}