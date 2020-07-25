'use strict';

var allText = readTextFile("./data/words_frequent.txt");

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
    document.getElementById('start').classList.add("hidden");
    document.getElementById('container').classList.remove("hidden");
    document.getElementById('shuffle').classList.remove("hidden");
    clear();
    for (let i = 0; i < 5; i++) {
        let $row = document.createElement("div");
        $row.classList.add("row");
        for (let i = 0; i < 5; i++) {
            let $card = document.createElement("div");
            $card.classList.add("card", "white");
            let $p1 = document.createElement("p")
            let $p2 = document.createElement("p")
            $p1.textContent = allText[getRandomInt(allText.length - 1)];
            $p2.textContent = $p1.textContent;
            $p2.classList.add('rotate');
            $card.append($p);
            $row.append($card);

            $card.addEventListener("click", function() {
                if ($card.classList.contains('white')) {
                    $card.classList.remove('white');
                    $card.classList.add('red');
                } else if ($card.classList.contains('red')) {
                    $card.classList.remove('red');
                    $card.classList.add('blue');
                } else if ($card.classList.contains('blue')) {
                    $card.classList.remove('blue');
                    $card.classList.add('yellow');
                } else if ($card.classList.contains('yellow')) {
                    $card.classList.add('black');
                    $card.classList.remove('yellow');
                    $p.classList.add("white-text");
                } else if ($card.classList.contains('black')) {
                    $card.classList.remove('black');
                    $p.classList.remove("white-text");
                    $card.classList.add('white');
                }
            });
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
