var selector = null;
var minimized = false;
var rock = [["What'd I Say","4E"], ["Smells Like Teen Spirit","5E"], ["Hey Jude","5E"], ["Johnny B. Goode","4E"], ["Good Vibrations","4E"],
            ["Respect","4E"], ["What's Going On","4E"], ["Imagine","5E"], ["Satisfaction","5E"], ["Like A Rolling Stone","5E"]];
var metal = [["Master of puppets – Metallica","5E"], ["Hallowed by the name – Iron Maiden","5E"], ["Ace of spades – Motorhead","5E"],
            ["Hangar 18 – Megadeth","4E"], ["Angel of death – Slayer","4E"], ["Painkiller – Judas Priest","4E"], ["Paranoid – Black Sabbath","5E"],
            ["Holy Diver – Dio","4E"], ["Cemetery Gates – Pantera","4E"], ["Rime of the ancient mariner – Iron Maiden","5E"]];
var blues = [["Sweet Home Chicago","4E"], ["Dust My Broom","5E"], ["Crossroads","5E"], ["Key to Highway","4E"]];
var pop = [["Me, Myself & I","4E"], ["Cake By The Ocean","5E"], ["Pillowtalk","5E"], ["I Took A Pill In Ibiza","4E"]];
var currentlyPlaying = [];
var currentlyOrdered = [];
var beer = [["Sagres",0.99], ["Super Bock",0.99], ["Heineken",1.28], ["Cintra",0.64]];
var whisky = [["AAA",0.99], ["BBB",0.99], ["CCC",1.28], ["DDD",0.64]];
var vodka = [["EEE",0.99], ["FFF",0.99], ["GGG",1.28], ["HHH",0.64]];
var gin = [["III",0.99,[["gin","limão","gelo"],["morango"]]], ["JJJ",0.99], ["KKK",1.28], ["LLL",0.64]];
var currentGender = null;
var currentType = null;
var tableSelected = 1;
var rateSelected = 0;
var currentPrice = 0.0;
var currentDrink = "";

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

function makeUL(array, type) {
        // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {

        var item = document.createElement('li');
        var anchor = document.createElement('a');
        
        item.appendChild(document.createTextNode(array[i][0]));
        
        if (type == "setlist") {
               var image = document.createElement('img');
               image.src = "img/" + array[i][1] + ".png";
               
               anchor.appendChild(document.createTextNode('+'));
               anchor.id = "add";
               anchor.href = "javascript:void(0)";
               anchor.addEventListener('click', function() { addToPlaylist(this.parentElement.textContent); });
               
               item.appendChild(anchor);
               item.appendChild(image);
               list.appendChild(item);
        }
        
        else if (type == "playlist") {
               anchor.appendChild(document.createTextNode('X'));
               anchor.id = "remove";
               anchor.href = "javascript:void(0)";
               anchor.addEventListener('click', function() { removeFromPlaylist(this.parentElement.textContent); });

               item.appendChild(anchor);
               list.appendChild(item);        
        }
        
        else if (type == "drinks") {
                var price = document.createElement('a');
                var edit = document.createElement('a');

                price.appendChild(document.createTextNode(array[i][1] + "€"));
                price.id = "price";

                edit.appendChild(document.createTextNode('E'));
                edit.id = "edit";
                edit.href = "javascript:void(0)";
                edit.addEventListener('click', function() { editDrink(this.parentElement.textContent); });

                anchor.appendChild(document.createTextNode('+'));
                anchor.id = "add";
                anchor.href = "javascript:void(0)";
                anchor.addEventListener('click', function() { addToOrder(this.parentElement.textContent); });

                item.appendChild(anchor);
                item.appendChild(edit);
                item.appendChild(price);
                list.appendChild(item);
        }
        
        else if (type =="order") {
                anchor.appendChild(document.createTextNode('X'));
                anchor.id = "remove";
                anchor.href = "javascript:void(0)";
                anchor.addEventListener('click', function() { removeFromOrder(this.parentElement.textContent); });

                item.appendChild(anchor);
                list.appendChild(item);
        }
        
    }
    return list;
}

function makeCustom(drink) {
            // Create the list element:
    var allIngredients = document.createElement('ul');
    var currentIngredients = document.createElement('ul');

    for (var i = 0; i < gin.length; i++) {
        if (gin[i][0] == drink)
            var ingredients = gin[i][2]
    }

    for(var i = 0; i < ingredients[0].length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        var anchor = document.createElement('a');
        // Set its contents:
        item.appendChild(document.createTextNode(ingredients[0][i]));
        anchor.appendChild(document.createTextNode('X'));
        anchor.id = "remove";
        anchor.href = "javascript:void(0)";
        anchor.addEventListener('click', function() { removeIngredient(drink, this.parentElement.textContent); });

        item.appendChild(anchor);
        // Add it to the list:
        currentIngredients.appendChild(item);
    }

    for(var i = 0; i < ingredients[1].length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        var anchor = document.createElement('a');
        // Set its contents:
        item.appendChild(document.createTextNode(ingredients[1][i]));
        anchor.appendChild(document.createTextNode('+'));
        anchor.id = "add";
        anchor.href = "javascript:void(0)";
        anchor.addEventListener('click', function() { addIngredient(drink, this.parentElement.textContent); });

        item.appendChild(anchor);
        // Add it to the list:
        allIngredients.appendChild(item);
    }
    // Finally, return the constructed list:
    return [currentIngredients, allIngredients];
}

function removeFromPlaylist(song) {

    confirm("Pretende remover esta música da playlist?");

    var index = currentlyPlaying.indexOf(song.substring(0, song.length - 1));
    currentlyPlaying.splice(index, 1);

    document.getElementById('playlist').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('playlist').appendChild(makePlaylist(currentlyPlaying));

    updateFooter();
}

function addToPlaylist(song) {

    var index = currentlyPlaying.indexOf(song.substring(0, song.length - 1));

    if (index == -1)
        currentlyPlaying.push(song.substring(0, song.length - 1));
    else
        alert("A música já se encontra na playlist");

    updateFooter();
}

function updateFooter() {

    var elements = document.getElementsByClassName('playing');
    for (var i = 0; i < elements.length; i++) {
        elements[i].querySelector("#playing").textContent = "A tocar: " + currentlyPlaying[0];
        elements[i].querySelector("#rate").querySelector("#rateIMG").src = "img/" + getRate(currentlyPlaying[0]) + ".png";
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

  var item = getIndexOf(song);
  return window[item[0]][item[1]][1];

}

function changeRate(song, newRate) {
  var item = getIndexOf(song);
  window[item[0]][item[1]][1] = newRate;
}

function minimize() {

    if(minimized == false) {
        document.getElementById('game_menu').style.display='none';
        document.getElementById('fade').style.display='none';
        document.getElementById('current_game').style.position='fixed';
        document.getElementById('current_game').style.top = '0px';
        document.getElementById('current_game').style.left = '0px';
        document.getElementById('current_game').style.height = '6%';
        document.getElementById('current_game').style.width = '6%';
        document.getElementById('game_header').style.position = 'relative';
        minimized = true;
    }
    else {
        document.getElementById('fade').style.display='block';
        document.getElementById('current_game').style.position='absolute';
        document.getElementById('current_game').style.top = '12.5%';
        document.getElementById('current_game').style.left = '12.5%';
        document.getElementById('current_game').style.height = '75%';
        document.getElementById('current_game').style.width = '75%';
        document.getElementById('game_header').style.position = 'fixed';
        minimized = false;
    }
}

function editDrink(drink) {

    currentDrink = drink;
    drink = drink.substring(0, drink.length - 7);
    var lists = makeCustom(drink)

    document.getElementById('drinks').style.display='none';
    document.getElementById('drinks').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('customize').style.display='block';
    document.getElementById('customize').appendChild(lists[0]);
    document.getElementById('customize').appendChild(lists[1]);

}

function addToOrder(drink) {

    currentlyOrdered.push(drink.substring(0, drink.length - 7));
    currentPrice += 0.99;

    updateOrder();
}

function removeFromOrder(drink) {

    confirm("Pretende remover esta bebida da encomenda?");

    var index = currentlyOrdered.indexOf(drink.substring(0, drink.length - 7));
    currentlyOrdered.splice(index, 1);

    document.getElementById('allOrder').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('allOrder').appendChild(makeOrder(currentlyOrdered));

    updateFooter();
}

function addIngredient(drink, ingredient) {

    confirm("Pretende adicionar este ingrediente a sua bebida?");

    var item = getIndexOf(drink);
    var ingredients = window[item[0]][item[1]][2];

    var index = ingredients[1].indexOf(ingredient.substring(0, ingredient.length - 1));
    ingredients[1].splice(index, 1);
    ingredients[0].push(ingredient.substring(0, ingredient.length - 1));

    window[item[0]][item[1]][2] = ingredients;

    document.getElementById('customize').removeChild(document.getElementsByTagName('UL')[1]);
    document.getElementById('customize').appendChild(makeCustom(drink)[1]);

}

function removeIngredient(drink, ingredient) {

    confirm("Pretende remover este ingrediente da sua bebida?");

    var item = getIndexOf(drink);

    var ingredients = window[item[0]][item[1]][2];

    var index = ingredients[0].indexOf(ingredient.substring(0, ingredient.length - 1));
    ingredients[0].splice(index, 1);
    ingredients[1].push(ingredient.substring(0, ingredient.length - 1));

    window[item[0]][item[1]][2] = ingredients;

    document.getElementById('customize').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('customize').appendChild(makeCustom(drink)[0]);

    document.getElementById('customize').removeChild(document.getElementsByTagName('UL')[0]);
    document.getElementById('customize').appendChild(makeCustom(drink)[1]);

}

function updateOrder() {
    var elements = document.getElementsByClassName('order');
    for (var i = 0; i < elements.length; i++) {
        elements[i].querySelector("#order").textContent = "A pedir: " + currentlyOrdered[0];
        elements[i].querySelector("#tprice").textContent = currentPrice + "€";
    }
}


/* Given an item (drink or music), this function returns the list and index in the list of that iten,
in the form [list, index]*/
function getIndexOf(item) {

  var i;

  for (i = 0; i < rock.length; i++) {
      if (rock[i][0] == item)
          return ["rock", i]
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

  for (i = 0; i < gin.length; i++) {
      if (gin[i][0] == item)
          return ["beer", i]
  }

  for (i = 0; i < gin.length; i++) {
      if (gin[i][0] == item)
          return ["vodka", i]
  }

  for (i = 0; i < gin.length; i++) {
      if (gin[i][0] == item)
          return ["whisky", i]
  }

  return -1;
}
