var filePath = "nonJsonTxtFile.txt";
var urlArray = {};
var i = 0;
var urlArray = [];
//var timeOut;


function readTextFile(file) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == 200) {
            urlArray =  xhr.responseText.split("\n");
            //urlArray = JSON.parse(xhr.responseText);
            populate();
        }
    }

    xhr.open("GET", file, true);
    xhr.send();
}
function populate() {
    while (i < urlArray.length) {
        var image = document.getElementById("img");
        image.src = urlArray[i].trim();
        timeOut = setTimeout(populate, 2000/*Number(urlArray[i].time)*/);
        i++;
        if (i == urlArray.length)
        { i = 0 }
        break;
    }
}

function backBtn() {
    clearTimeout(timeOut);
    if (i == 1)
        i = urlArray.length - 1;
    else if (i == 0)
        i = urlArray.length - 2;
    else
        i = i - 2;
    populate();
}

addEventListener("load", function () { readTextFile(filePath); }, false);
document.getElementById("next").addEventListener("click", function () { clearTimeout(timeOut); populate(); }, false);
document.getElementById("back").addEventListener("click", backBtn, false);
document.getElementById("update").addEventListener("click", function () { clearTimeout(timeOut); i = 0; readTextFile(filePath); }, false);
