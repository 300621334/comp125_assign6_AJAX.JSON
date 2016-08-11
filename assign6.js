var filePath = "jsonFile.txt";
var objectifiedFile = {};
var i = 0;
var timeOut;

//{pic1:"1.png",
//    pic2:"2.png",
//pic3:"3.png"
//};
var allText = "";
var stringifyFile = "";

function readTextFile(file) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == 200) {
            //stringifyFile = JSON.stringify(xhr.responseText);
            objectifiedFile = JSON.parse(xhr.responseText);
            populate();
        }
    }

    xhr.open("GET", file, true);
    xhr.send();
}
function populate() {
    while(i < objectifiedFile.length)
    {
        var image = document.getElementById("img");
        image.src = objectifiedFile[i].pic;
        timeOut = setTimeout(populate, Number(objectifiedFile[i].time));
        i++;
        if (i == objectifiedFile.length)
        {i = 0}
        break;
    }
}

function backBtn()
{
    clearTimeout(timeOut);
    if (i == 1)
        i = objectifiedFile.length - 1;
    else if (i == 0)
        i = objectifiedFile.length - 2;
    else
        i = i - 2;
    populate();
}

addEventListener("load", function () { readTextFile(filePath); }, false);
document.getElementById("next").addEventListener("click", function () { clearTimeout(timeOut); populate(); }, false);
document.getElementById("back").addEventListener("click", backBtn, false);
