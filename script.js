/* All variables are initialized here */
var button = 2;
var selector = null;
var minimized = false;
var rockMuse = [["Assassin","4E"], ["Bliss","5E"], ["Citizen Erased","5E"], ["Dead Star","5E"], ["Feeling Good","4E"],
            ["Hysteria","4E"], ["Knights of Cydonia","5E"], ["Map of Problematique","5E"], ["New Born","5E"], ["Showbiz","5E"]];
var rockACDC = [["Dirty Deeds Done Dirt Cheap","5E"],["For Those About to Rock (We Salute You)","5E"],["Highway to Hell","4E"],["Problem Child","5E"],["Thunderstruck","5E"],["The Jack","4E"],["You Shook Me All Night Long","5E"]];
var rockBeatles = [["Across the Universe","5E"], ["A Day in the Life","5E"], ["Blackbird","5E"], ["Eleanor Rigby","5E"], ["Hey Jude","5E"], ["Let It Be","5E"], ["Strawberry Fields Forever","5E"], ["While My Guitar Gently Weeps","5E"]];
var rockFFighters = [["All My Life","5E"], ["Best of You","5E"], ["Everlong","5E"], ["Monkey Wrench","5E"], ["My Hero","5E"],["The Pretender","5E"], ["Something From Nothing","5E"], ["Walk","5E"]];
var rockGnRoses = [["Civil War","5E"], ["Estranged","5E"], ["Mr. Brownstone","5E"], ["Nightrain","5E"], ["November Rain","5E"], ["Patience","5E"], ["Paradise City","5E"], ["Sweet Child O’ Mine","5E"]];
var rockQueen = [["Another One Bites the Dust","5E"], ["Bohemian Rhapsody","5E"], ["Crazy Little Thing Called Love","5E"], ["Fat Bottomed Girls","5E"], ["Somebody to Love","5E"], ["Under Pressure","5E"], ["Killer Queen","5E"], ["We Will Rock You / We Are the Champions","5E"]];
var metal = [["Master of puppets – Metallica","5E"], ["Hallowed by the name – Iron Maiden","5E"], ["Ace of spades – Motorhead","5E"],
            ["Hangar 18 – Megadeth","4E"], ["Angel of death – Slayer","4E"], ["Painkiller – Judas Priest","4E"], ["Paranoid – Black Sabbath","5E"],
            ["Holy Diver – Dio","4E"], ["Cemetery Gates – Pantera","4E"], ["Rime of the ancient mariner – Iron Maiden","5E"]];
var blues = [["Sweet Home Chicago","4E"], ["Dust My Broom","5E"], ["Crossroads","5E"], ["Key to Highway","4E"]];
var pop = [["Me, Myself & I","4E"], ["Cake By The Ocean","5E"], ["Pillowtalk","5E"], ["I Took A Pill In Ibiza","4E"]];
var currentlyPlaying = ["Hangar 18 – Megadeth", "Angel of death – Slayer", "Painkiller – Judas Priest"];
var currentlyPlayingOther = ["Hangar 18 – Megadeth", "Angel of death – Slayer", "Painkiller – Judas Priest"];
var currentlyOrdered = [];

var beer = [["Sagres - 0.33",0.99], ["Super Bock - 0.33",0.99], ["Heineken - 0.33",1.28], ["Cintra - 0.33",0.64], ["Sagres - 0.50",1.49], ["Super Bock - 0.50",1.49], ["Heineken - 0.50",1.99], ["Cintra - 0.50",1.04]];
var shots = [["Broche", 2.95, [["Chantilly","Gin"],["Vodka","Tequilla","Absinto"]]], ["Canhão", 2.95, [["Tequilla","Absinto"],["Vodka","Whisky","Limão"]]],
            ["ChupaNoGrelo", 2.95, [["Aguardente","Gin"],["Vodka","Tequilla","Absinto"]]], ["DragonBall", 2.95], ["Kalashnikov", 2.95, [["Fogo","Vodka"],["Limão","Tequilla","Absinto"]]]];
var vodka = [["Imperia", 28.5], ["Skyy90", 33.5], ["Jean Mark XO", 50.5], ["Ultimat", 53.5], ["Xellent", 37.5]];
var cocktails = [["Daiquiri", 8.99], ["Manhattam", 6.99], ["Margarita", 5.99], ["Martini", 5.99], ["Mojito", 6.99]];
var cafetaria = [["Expresso", 0.69], ["Capuccino", 1.3], ["Chá de limão", 1.5], ["Cha Preto", 1.5], ["Cha de Menta", 1.5],];
var snacks = [["Batatas fritas",0.60], ["Amendoins",0.60], ["Tremoços",0.60], ["Pipocas",0.60], ["Pistachos",0.60]];
var gin = [["Hendricks", 5], ["Martin Millers", 5], ["Bulldog", 6], ["G`Vine", 6], ["Tanqueray Ten", 8]];
var licores = [["Beirão", 5], ["Amora", 5], ["Café", 6], ["Laranja", 6], ["Mel", 8]];
var semalcool = [["Coca-Cola",1.5], ["Sumo Natural de Laranja",2], ["Sumo Natural de Maça",2], ["RedBull",3], ["7up",1.5]];

var currentGender = null;
var currentType = null;
var tableSelected = 1;
var rateSelected = 0;
var currentPrice = 0.0;
var currentDrink = "";



/* This function is used when rating a song. The popup that appears has 5 stars.
Given a rate from 1 to 5 (id), the function fills all the stars from 1 to id */
function switchRate(id) {

    for(var i = 1; i < 6; i++)
        document.getElementById(i + "star").src="img/star.png";
    for(var i = 1; i <=id ; i++)
        document.getElementById(i + "star").src= "img/filledStar.png";
}

/* This function is used when selecting another table to play with. The number
of the table selected is given by id. If the table with the number id is selected
(grey), it's desselected. otherwise it's turned into a grey table */
function switchColor(id) {

    var current = document.getElementById(id).style.backgroundColor;
    if (current == 'white' || current =='')
        document.getElementById(id).style.backgroundColor = 'grey';
    else
        document.getElementById(id).style.backgroundColor = 'white';
}

/* This function is one of our main functions. It creates a list inside of a div.
There are several types of lists with different styles: Lists of artist musics, the
list of musics in the playlist, lists of drinks, lists of drinks ordered...
Each list has different elements */

function makeUL(array, type) {

    // Create the list element:
    var list = document.createElement('ul');


    for(var i = 0; i < array.length; i++) {
    /* For each element of the given array of list elements, we create at least
    a list and an anchor element */
        var item = document.createElement('li');
        var anchor = document.createElement('a');


        if (type == "setlist") {
               /* If we are creating a setlist, the list has a text element
               (name of the song), an image of the rate of the song (number of stars),
               and an anchor element with an icon to add or remove the song from the
               playlist
               The array of songs is of type [Name, Rate]*/

               item.appendChild(document.createTextNode(array[i][0]));
               var image = document.createElement('img');
               image.src = "img/" + array[i][1] + ".png";

               if (currentlyPlaying.indexOf(array[i][0]) == -1) {
                    /* If the music isn't on the playlist, it can be added */
                    var add = document.createElement('img');
                    add.src = "img/add.png";
                    anchor.appendChild(add);
                    anchor.id = "add";
                    anchor.href = "javascript:void(0)";
                    anchor.addEventListener('click', function() { addToPlaylist(this.parentElement.textContent); });
               }
               else {
                    /* TODO Otherwise, it can be removed (or not?) */
                    var check = document.createElement('img');
                    check.src = "img/check.png";
                    anchor.appendChild(check);
                    anchor.id = "otherTable";
               }

               item.appendChild(anchor);
               item.appendChild(image);
               list.appendChild(item);
        }

        else if (type == "playlist") {

                /* If we are creating a playlist, the list has a text element
                (name of the song), and an anchor element with an icon to
                remove the song from the playlist */

                item.appendChild(document.createTextNode(array[i]));

                if (currentlyPlayingOther.indexOf(array[i]) == -1) {
                  /* we can only remove the song if it's not created by another
                  table */
                    var remove = document.createElement('img');
                    remove.src = "img/wrong.png";
                    anchor.appendChild(remove);
                 anchor.id = "remove";
                 anchor.href = "javascript:void(0)";
                 anchor.addEventListener('click', function() { removeFromPlaylist(this.parentElement.textContent); });
                 item.appendChild(anchor);
                }

               list.appendChild(item);
        }

        else if (type == "drinks") {

          /* If we are creating a drink list, the list has 3 text elements
          (name of the drink, price and ammount), an anchor element with an icon to add
          the drink, and, if the drink is editable, an icon to edit the drink
          The array of songs is of type [Name, Price, [ingredientsAdded,ingredientsToAdd]].
          Note that the ingredients part is optional */

                item.appendChild(document.createTextNode(array[i][0]));

                var price = document.createElement('a');
                var edit = document.createElement('a');
                var ammount = document.createElement('a');

                ammount.appendChild(document.createTextNode(numberOfDrinks(array[i][0]) + "x"));
                ammount.id = "ammount";

                price.appendChild(document.createTextNode(array[i][1] + "€"));
                price.id = "price";

                var add = document.createElement('img');
                add.src = "img/add.png";
                anchor.appendChild(add);

                anchor.id = "add";
                anchor.href = "javascript:void(0)";
                anchor.addEventListener('click', function() { addToOrder(this.parentElement.textContent); });
                item.appendChild(anchor);

                if (array[i].length == 3) {
                    /* We only add the edit icon if the ingrents camp is on the drink */
                    var customize = document.createElement('img');
                    customize.src = "img/edit.png";
                    edit.appendChild(customize);
                    edit.id = "edit";
                    edit.href = "javascript:void(0)";
                    edit.addEventListener('click', function() { editDrink(this.parentElement.textContent); });
                }
                else {
                    var customize = document.createElement('img');
                    edit.appendChild(customize);
                    edit.id = "edit";
                }

                item.appendChild(edit);
                item.appendChild(ammount);
                item.appendChild(price);
                list.appendChild(item);
        }

        else if (type =="order") {
          /* If we are creating a list of ordered drinks, the list has 2 text elements
          (name of the drink, price), an anchor element with an icon to remove
          the drink. */
                var price = document.createElement('a');

                item.appendChild(document.createTextNode(array[i]));

                /* The (window[index[0]][index[1]][1]) trick alows us to create a text node
                with the content of a given index of the index[0] array */
                var index = getIndexOf(array[i]);
                price.appendChild(document.createTextNode(window[index[0]][index[1]][1] + "€"));
                price.id = "price";

                var remove = document.createElement('img');
                remove.src = "img/wrong.png";
                anchor.appendChild(remove);
                anchor.id = "remove";
                anchor.href = "javascript:void(0)";
                anchor.addEventListener('click', function() { removeFromOrder(this.parentElement.textContent); });

                item.appendChild(anchor);
                item.appendChild(price);
                list.appendChild(item);
        }

    }
    return list;
}

function makeCustom(drink) {

  /* When customizing a drink we have a different type of screen, with 2 lists.
  The first list names the current ingredients of the drink. the second one lists
  the ingredients we can add to the drink.
  We return the 2 lists in a list of lists */

    var currentIngredients = document.createElement('ul');
    var allIngredients = document.createElement('ul');


    var index = getIndexOf(drink);
    ingredients = window[index[0]][index[1]][2];

    for(var i = 0; i < ingredients[0].length; i++) {

        var item = document.createElement('li');
        var anchor = document.createElement('a');

        item.appendChild(document.createTextNode(ingredients[0][i]));
        var remove = document.createElement('img');
        remove.src = "img/wrong.png";
        anchor.appendChild(remove);
        anchor.id = "remove";
        anchor.href = "javascript:void(0)";
        anchor.addEventListener('click', function() { removeIngredient(drink, this.parentElement.textContent); });
        /* The event listener has a function with a function because if it only has
        the remove ingredient function, it runs when loading the page*/

        item.appendChild(anchor);

        currentIngredients.appendChild(item);
    }

    for(var i = 0; i < ingredients[1].length; i++) {

        var item = document.createElement('li');
        var anchor = document.createElement('a');

        item.appendChild(document.createTextNode(ingredients[1][i]));
        var add = document.createElement('img');
        add.src = "img/add.png";
        anchor.appendChild(add);
        anchor.id = "add";
        anchor.href = "javascript:void(0)";
        anchor.addEventListener('click', function() { addIngredient(drink, this.parentElement.textContent); });
        /* The event listener has a function with a function because if it only has
        the add ingredient function, it runs when loading the page*/

        item.appendChild(anchor);

        allIngredients.appendChild(item);
    }

    return [currentIngredients, allIngredients];
}

function removeFromPlaylist(song) {

    /* This function removes a given song from the playlist.
    It first confirms with the user, then it removes the song
    from the currentlyPlaying list and updates the playlist screen */
    document.getElementById('mini_accept').addEventListener('click', function() {
        appendConfirmJukebox(song);
    });
    customConfirm("Pretende remover esta música da playlist?");

}

function addToPlaylist(song) {

  /* This function adds a given song to the playlist.
  When adding a song to the playlist, it confirms if the song isn't there allready.
  If it is, it removes it from the playlist. Otherwise, it adds it, and changes
  the icon from a plus to a checked icon */

    var index = currentlyPlaying.indexOf(song);

    if (index == -1) {
        currentlyPlaying.push(song);
        var list = document.getElementsByTagName('LI');
        for (var i = 0; i < list.length; i++)
            if (list[i].textContent == song) {
                list[i].querySelector("#add > img:first-of-type").src = "img/check.png";
            }
    }
    else {
        var list = document.getElementsByTagName('LI');
        for (var i = 0; i < list.length; i++)
            if (list[i].textContent == song)
                list[i].querySelector("#add > img:first-of-type").src = "img/add.png";
        removeFromPlaylist(song);
    }
    updateFooter();
}

function updateFooter() {
/*This function updates the footer OF THE JUKEBOX area.
It gets all the footer elements of the diferent parts of the jukebox area
and updates all of them to show the currentlyPlaying music name and rate.
If there arre no songs playing, the footer is hidden. */

    var elements = document.getElementsByClassName('playing');

    if(currentlyPlaying.length > 0) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].querySelector("#playing").textContent = "A tocar: " + currentlyPlaying[0];
            elements[i].querySelector("#rate").querySelector("#rateIMG").src = "img/" + getRate(currentlyPlaying[0]) + ".png";
        }
    }

    var footers = document.getElementsByTagName('FOOTER');

    for(var i = 0; i < footers.length; i++) {
        if(currentlyPlaying.length == 0)
            footers[i].style.display="none"
        else
            footers[i].style.display="block";
    }
}

function getRate(song) {
  /* This function returns the rate of a song*/
  var item = getIndexOf(song);
  return window[item[0]][item[1]][1];

}

function changeRate(song, newRate) {
  /* This function changes the rate of a song*/
  var item = getIndexOf(song);
  window[item[0]][item[1]][1] = newRate;
}

function minimize() {
/* We use this function to minimize or maximize a game*/

    if(minimized == false) {
      /*If it's maximized, we hide the game menu, and resize the game to the top
      left corner of the main screen*/
        document.getElementById('game_menu').style.display='none';
        document.getElementById('fade').style.display='none';
        document.getElementById('current_game').style.position='fixed';
        document.getElementById('current_game').style.top = '0px';
        document.getElementById('current_game').style.left = '0px';
        document.getElementById('current_game').style.height = '15%';
        document.getElementById('current_game').style.width = '10%';
        document.getElementById('game_header').style.display = 'none';
        document.getElementById('clickableGame').style.display = 'block'

        minimized = true;
    }
    else {
      /*If it's minimized, we put the game back to it's original css rules*/
        document.getElementById('fade').style.display='block';
        document.getElementById('current_game').style.position='absolute';
        document.getElementById('current_game').style.top = '12.5%';
        document.getElementById('current_game').style.left = '12.5%';
        document.getElementById('current_game').style.height = '75%';
        document.getElementById('current_game').style.width = '75%';
        document.getElementById('game_header').style.display = 'block';
        document.getElementById('clickableGame').style.display = 'none'

        minimized = false;
    }
}

function editDrink(drink) {

    /* This function opens the screen to edit a drink. It's called in the drinks
    screen */

    currentDrink = drink;
    drink = drink.substring(0, drink.length - 7);
    /* FIXME It receives a drink,the price and the ammount in one string, so we have to crop.
    (Sagres0.99€2x)*/
    var lists = makeCustom(drink)

    document.getElementById('drinks').style.display='none';
    document.getElementById('drinks').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('customize').style.display='block';
    document.getElementById('customize').appendChild(lists[0]);
    document.getElementById('customize').appendChild(lists[1]);

}

function addToOrder(drink) {

  /* This function adds a given drink to the order.
  When adding a drink to the order, it updates the screen to show the new
  ammount of drinks in the order */

    currentlyOrdered.push(drink.substring(0, drink.length - 7));
    var item = getIndexOf(drink.substring(0, drink.length - 7));
    /* FIXME It receives a drink,the price and the ammount in one string, so we have to crop.
    (Sagres0.99€2x)*/
    currentPrice += window[item[0]][item[1]][1];


    try {
      document.getElementById('drinks').removeChild(document.getElementsByTagName('UL')[0]);
      document.getElementById('drinks').appendChild(makeUL(currentType, 'drinks'));
    }
    catch (TypeERROR) {}


    /* The order footer is updated with the new total price and drinks */
    updateOrder();
}

function removeFromOrder(drink) {

  /* This function removes a given drink from the order.
  When removing a drink we confirm with the user, remove the drink from the currentlyOrdered
  list and reupdate the screen to show the new ammount of drinks in the order */
  document.getElementById('mini_accept').addEventListener('click', function() {
      appendConfirmRemove(drink);
  });
    customConfirm("Pretende remover esta bebida da encomenda?");


}

function addIngredient(drink, ingredient) {

    var item = getIndexOf(drink);
    var ingredients = window[item[0]][item[1]][2];

    var index = ingredients[1].indexOf(ingredient);
    ingredients[1].splice(index, 1);
    ingredients[0].push(ingredient);

    window[item[0]][item[1]][2] = ingredients;

    document.getElementById('customize').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('customize').appendChild(makeCustom(drink)[0]);

    document.getElementById('customize').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('customize').appendChild(makeCustom(drink)[1]);

}

function removeIngredient(drink, ingredient) {

    var item = getIndexOf(drink);

    var ingredients = window[item[0]][item[1]][2];

    var index = ingredients[0].indexOf(ingredient);
    ingredients[0].splice(index, 1);
    ingredients[1].push(ingredient);

    window[item[0]][item[1]][2] = ingredients;

    document.getElementById('customize').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('customize').appendChild(makeCustom(drink)[0]);

    document.getElementById('customize').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('customize').appendChild(makeCustom(drink)[1]);

}

function updateOrder() {

    var ordered = "";
    for (var i=0; i < currentlyOrdered.length; i++) ordered += (currentlyOrdered[i] + " | ");

    var elements = document.getElementsByClassName('order');
    for (var i = 0; i < elements.length; i++) {
        if (currentlyOrdered.length == 0) {
            elements[i].querySelector("#acceptOrder").style.display = 'none';
            elements[i].querySelector("#order").textContent = "A pedir: ";
            elements[i].querySelector("#tprice").textContent = "0.00€";
        }
        else {
            elements[i].querySelector("#order").textContent = "A pedir: " + ordered;
            elements[i].querySelector("#tprice").textContent = Math.round(currentPrice*100)/100 + "€";
            elements[i].querySelector("#acceptOrder").style.display = 'block';
        }
    }

    document.getElementById("total1").textContent = "Total: " + Math.round(currentPrice*100)/100 + "€";
    document.getElementById("total2").textContent = "Total: " + Math.round(currentPrice*100)/100 + "€";
}

function numberOfDrinks(drink) {
  var count = 0;
  for (var i = 0; i < currentlyOrdered.length; i++) if (currentlyOrdered[i] == drink) count++;
  return count;
}


/* Given an item (drink or music), this function returns the list and index in the list of that iten,
in the form [list, index]*/
function getIndexOf(item) {

  var i;

  for (i = 0; i < rockMuse.length; i++) {
      if (rockMuse[i][0] == item)
          return ["rockMuse", i]
  }

  for (i = 0; i < rockACDC.length; i++) {
      if (rockACDC[i][0] == item)
          return ["rockACDC", i]
  }

  for (i = 0; i < rockFFighters.length; i++) {
      if (rockFFighters[i][0] == item)
          return ["rockFFighters", i]
  }

  for (i = 0; i < rockGnRoses.length; i++) {
      if (rockGnRoses[i][0] == item)
          return ["rockGnRoses", i]
  }

  for (i = 0; i < rockQueen.length; i++) {
      if (rockQueen[i][0] == item)
          return ["rockQueen", i]
  }

  for (i = 0; i < rockBeatles.length; i++) {
      if (rockBeatles[i][0] == item)
          return ["rockBeatles", i]
  }

  for (i = 0; i < metal.length; i++) {
      if (metal[i][0] == item)
          return ["metal", i]
  }

  for (i = 0; i < pop.length; i++) {
      if (pop[i][0] == item)
          return ["pop", i]
  }

  for (i = 0; i < blues.length; i++) {
      if (blues[i][0] == item)
          return ["blues", i]
  }

  for (i = 0; i < gin.length; i++) {
      if (gin[i][0] == item)
          return ["gin", i]
  }

  for (i = 0; i < beer.length; i++) {
      if (beer[i][0] == item)
          return ["beer", i]
  }

  for (i = 0; i < vodka.length; i++) {
      if (vodka[i][0] == item)
          return ["vodka", i]
  }

  for (i = 0; i < shots.length; i++) {
      if (shots[i][0] == item)
          return ["shots", i]
  }

  for (i = 0; i < cocktails.length; i++) {
      if (cocktails[i][0] == item)
          return ["cocktails", i]
  }

  return -1;
}

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}

function alert(text) {
    document.getElementById('alert_text').textContent = text;
    toggle_visibility('alert');
}

function customConfirm(text) {
    document.getElementById('confirm_text').textContent = text;
    toggle_visibility('confirm');
}

function appendConfirmBar() {
    alert('O seu pedido está a ser processado');
    document.getElementById('counter').style.display='none';
    document.getElementById('allOrder').style.display='none';
    document.getElementById('checkout').style.display='none';
    document.getElementById('fade').style.display='none';
    document.getElementById('fade2').style.display='none';
    document.getElementById('allOrder').removeChild(document.getElementsByTagName('UL')[0]);
}

function appendConfirmClean() {
    document.getElementById('allOrder').style.display='none';
    document.getElementById('fade2').style.display='none';
    currentlyOrdered = [];
    document.getElementById('allOrder').removeChild(document.getElementsByTagName('UL')[0]);
    updateOrder();
}

function appendConfirmRemove(drink) {
    var index = currentlyOrdered.indexOf(drink.substring(0, drink.length - 7));
    currentlyOrdered.splice(index, 1);

    document.getElementById('allOrder').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('allOrder').appendChild(makeUL(currentlyOrdered, 'order'));

    /* The order footer is updated with the new total price and drinks */
    updateOrder();
}

function appendConfirmJukebox(song) {
    var index = currentlyPlaying.indexOf(song);
    currentlyPlaying.splice(index, 1);

    try {
        document.getElementById('playlist').removeChild(document.getElementsByTagName('UL')[0]);
        document.getElementById('playlist').appendChild(makeUL(currentlyPlaying, 'playlist'));
    }
    catch (DOMexception) {} /* EXPERIMENT */

    /* The footer is updated for when we remove the first song of the playlist */
    updateFooter();
}

function appendConfirmGame() {
  document.getElementById('challenge_table').style.display='none';
  document.getElementById('fade2').style.display='none';
  document.getElementById('current_game').style.display='block';

}

function appendConfirmExit() {
  document.getElementById('exitScreen').style.display='block';
}
