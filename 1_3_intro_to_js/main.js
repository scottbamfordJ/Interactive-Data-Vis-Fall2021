var count = 0
var button_clicks = document.getElementById("counting_clicks")
var reset_clicks = document.getElementById('reset')
button_clicks.onclick = function() {
    count+= 1;
    this.innerHTML = count;
}

reset_clicks.onclick = function() {
    count = 0
    button_clicks.innerHTML = count
}

var toggled_button = document.getElementById("toggle")
toggled_button.onclick = function() {
    if (toggled_button === "X"){
        toggled_button = "O";
    } else if (toggled_button = "O") {
        toggled_button = "X";
    }
    this.innerHTML = toggled_button
}

var topleft = document.getElementById("TopLeft")

topleft.onclick = function(){
    if (toggled_button === "X"){
        topleft = "X";
    } else {
        topleft = "0"
    }
    this.innerHTML = topleft
}

var topmiddle = document.getElementById("TopMiddle")

topmiddle.onclick = function(){
    if (toggled_button === "X"){
        topmiddle = "X";
    } else {
        topmiddle = "0"
    }
    this.innerHTML = topmiddle
}
var topright = document.getElementById("TopRight")

topright.onclick = function(){
    if (toggled_button === "X"){
        topright = "X";
    } else {
        topright = "0"
    }
    this.innerHTML = topright
}
var middleleft = document.getElementById("MiddleLeft")

middleleft.onclick = function(){
    if (toggled_button === "X"){
        middleleft = "X";
    } else {
        middleleft = "0"
    }
    this.innerHTML = middleleft
}
var middlemiddle = document.getElementById("MidleMidle")

middlemiddle.onclick = function(){
    if (toggled_button === "X"){
        middlemiddle = "X";
    } else {
        middlemiddle = "0"
    }
    this.innerHTML = middlemiddle
}
var middlemright = document.getElementById("MidleRight")

middlemright.onclick = function(){
    if (toggled_button === "X"){
        middlemright = "X";
    } else {
        middlemright = "0"
    }
    this.innerHTML = middlemright
}
var bottomleft = document.getElementById("BottomLeft")

bottomleft.onclick = function(){
    if (toggled_button === "X"){
        bottomleft = "X";
    } else {
        bottomleft = "0"
    }
    this.innerHTML = bottomleft
}
var bottommiddle = document.getElementById("BottomMiddle")

bottommiddle.onclick = function(){
    if (toggled_button === "X"){
        bottommiddle = "X";
    } else {
        bottommiddle = "0"
    }
    this.innerHTML = bottommiddle
}
var bottomright = document.getElementById("BottomRight")

bottomright.onclick = function(){
    if (toggled_button === "X"){
        bottomright = "X";
    } else {
        bottomright = "0"
    }
    this.innerHTML = bottomright
}

var reset_tictactoe = document.getElementsID("tictactoe")

reset_tictactoe.onlick = function() {
    location.reload();
}


