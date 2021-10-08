window.onload = function(){
    var gameboard = document.getElementById("board");
    var board_tiles = gameboard.getElementsByTagName("div");
    let plays = 0;
    const new_game = document.getElementsByClassName("btn");
    const players = ['X','O'];
    
    for (var tile = 0; tile < board_tiles.length; tile++){
        let ex = board_tiles[tile];
        addClass(ex,"square");
        ex.addEventListener("mouseover", function(){
            addClass(ex,"hover");
        })
        ex.addEventListener("mouseout", function(){
            rmvClass(ex,"hover");
        })
        ex.addEventListener("click", function(){
            mark_play(ex);
        })
    }

    new_game[0].addEventListener("click", function(){
        clear();
    })

    /* Adds class attribute to element */
    function addClass(ele, newclass){
        ele.classList.add(newclass);
    }

    /*Removes list of classes attribute to element*/
    function rmvClass(ele, ...rmvlist){
        ele.classList.remove(...rmvlist);
    }

   function mark_play(ele){
       var player = players[plays%2];
       ele.innerHTML = player;
       ele.style.pointerEvents = 'none';
       addClass(ele, player);
       player = players[++plays%2];
   }

   function clear(){
       for (i=0;i<board_tiles.length;i++){
           rmvClass(board_tiles[i], "X", "O");
           board_tiles[i].innerHTML = "";
           board_tiles[i].style.pointerEvents = "auto";
       }
    }

}