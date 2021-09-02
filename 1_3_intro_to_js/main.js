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