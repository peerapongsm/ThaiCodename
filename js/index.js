'use strict';

var allText = readTextFile("./libthai/data/tdict-std-compound.txt");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText.split("\n");
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function generate() {
    if (!document.getElementById('start').classList.contains('hidden')) {
        document.getElementById('start').classList.add("hidden");
    }
    if (document.getElementById('container').classList.contains('hidden')) {
        document.getElementById('container').classList.remove("hidden");
        document.getElementById('shuffle').classList.remove("hidden");
    }
    clear();
    for (let i = 0; i < 5; i++) {
        let $row = document.createElement("div");
        $row.classList.add("row");
        for (let i = 0; i < 5; i++) {
            let $card = document.createElement("div");
            $card.classList.add("card");
            let $p = document.createElement("p")
            $p.textContent = allText[getRandomInt(allText.length - 1)];
            $card.append($p);
            $row.append($card);
        }
        document.getElementById('container').append($row);
    }
}

function clear() {
    let myNode = document.getElementById('container');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}

document.getElementById('start').addEventListener("click", generate);
document.getElementById('shuffle').addEventListener("click", generate);
