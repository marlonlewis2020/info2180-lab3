window.onload = function(){
    var gameboard = document.getElementById("board");
    var board_tiles = gameboard.getElementsByTagName("div");
    
    for (var tile = 0; tile < board_tiles.length; tile++){
        addClass(board_tiles[tile],"square")
    }

    /*Adds class element to element*/
    function addClass(ele, newclass){
        ele.classList.add(newclass);
    }

    
}