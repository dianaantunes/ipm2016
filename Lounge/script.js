var selector = null;
var rock = [["What'd I Say","4E"],
            ["Smells Like Teen Spirit","5E"],
            ["Hey Jude","5E"],
            ["Johnny B. Goode","4E"],
            ["Good Vibrations","4E"],
            ["Respect","4E"],
            ["What's Going On","4E"],
            ["Imagine","5E"],
            ["Satisfaction","5E"],
            ["Like A Rolling Stone","5E"]];
var metal = [["Master of puppets – Metallica","5E"],
            ["Hallowed by the name – Iron Maiden","5E"],
            ["Ace of spades – Motorhead","5E"],
            ["Hangar 18 – Megadeth","4E"],
            ["Angel of death – Slayer","4E"],
            ["Painkiller – Judas Priest","4E"],
            ["Paranoid – Black Sabbath","5E"],
            ["Holy Diver – Dio","4E"],
            ["Cemetery Gates – Pantera","4E"],
            ["Rime of the ancient mariner – Iron Maiden","5E"]];
var pop = [];
var blues = [];
var currentlyPlaying = [];
var currentGender = null;
var tableSelected = 1;
var rateSelected = 0;

function switchRate(id) {

    for(var i = 1; i <= id; i++)
        document.getElementById(i + "star").src= "img/filledStar.png";
}

function switchColor(id) {

    var current = document.getElementById(id).style.backgroundColor;
    if (current == 'white' || current =='')
        document.getElementById(id).style.backgroundColor = 'grey';
    else
        document.getElementById(id).style.backgroundColor = 'white';
}

function makeSetlist(array) {
            // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        var anchor = document.createElement('a');
        // Set its contents:
        item.appendChild(document.createTextNode(array[i][0]));

        anchor.appendChild(document.createTextNode('+'));
        anchor.id = "add";
        anchor.href = "javascript:void(0)";
        anchor.addEventListener('click', function() { addToPlaylist(this.parentElement.textContent); });

        item.appendChild(anchor);
        // Add it to the list:
        list.appendChild(item);
    }
    // Finally, return the constructed list:
    return list;
}

function makePlaylist(array) {
            // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        var anchor = document.createElement('a');
        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        anchor.appendChild(document.createTextNode('X'));
        anchor.id = "remove";
        anchor.href = "javascript:void(0)";
        anchor.addEventListener('click', function() { removeFromPlaylist(this.parentElement.textContent); });

        item.appendChild(anchor);
        // Add it to the list:
        list.appendChild(item);
    }
    // Finally, return the constructed list:
    return list;
}

function removeFromPlaylist(song) {

    // confirm("Pretende remover esta música da playlist?");

    var index = currentlyPlaying.indexOf(song.substring(0, song.length - 1));
    currentlyPlaying.splice(index, 1);

    document.getElementById('playlist').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('playlist').appendChild(makePlaylist(currentlyPlaying));

    updateFooter();
}

function addToPlaylist(song) {

    confirm("Pretende adicionar a música " + song.substring(0, song.length - 1) + " à playlist?");

    currentlyPlaying.push(song.substring(0, song.length - 1));

    updateFooter();
}

function updateFooter() {
    var elements = document.getElementsByClassName('playing');
    for (var i = 0; i < elements.length; i++) {
        elements[i].querySelector("#playing").textContent = "A tocar: " + currentlyPlaying[0];
        elements[i].querySelector("#rate").querySelector("#rateIMG").src = "img/" + getRate(currentlyPlaying[0]) + ".png";
    }
}

function getRate(song) {

    for (var i = 0; i < rock.length; i++) {
        if (rock[i][0] == song)
            return rock[i][1];
    }

    for (var i = 0; i < metal.length; i++) {
        if (metal[i][0] == song)
            return metal[i][1];
    }

}

function changeRate(song, newRate) {
    for (var i = 0; i < rock.length; i++) {
        if (rock[i][0] == song)
            rock[i][1] = newRate;
    }

    for (var i = 0; i < metal.length; i++) {
        if (metal[i][0] == song)
            metal[i][1] = newRate;
    }
}
