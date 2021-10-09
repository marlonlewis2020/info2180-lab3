window.onload = function(){
    let winner = "";
    let wins = [0,0];
    let plays = 0;
    var status = document.getElementById("status");
    var gameboard = document.getElementById("board");
    var board_tiles = gameboard.getElementsByTagName("div");
    const new_game = document.getElementsByClassName("btn");
    const players = ["X","O"];
    
    for (var tile = 0; tile < board_tiles.length; tile++){
        let ex = board_tiles[tile];
        ex.classList.add("square");
        ex.addEventListener("mouseover", function(){ex.classList.add("hover")})
        ex.addEventListener("mouseout", function(){ex.classList.remove("hover")})
        ex.addEventListener("click", function(){mark_play(ex)})
    }

    new_game[0].addEventListener("click", function(){
        clear();
    })

    function points(){
        //let points = " - - - - - - X - - - - - - | - - - - - - O - - - - - - " + 
        //"\n - - - - - - " + wins[0] + " - - - - - -| - - - - - - " + wins[1] + " - - - - - - ";
        let points = "Move your mouse over a square and click to play an X or an O.";
        return points;
    }

    function checkWinner(){
        var pops = [[0,1,2],[3,4,5],[6,7,8], [0,4,8],[2,4,6], [0,3,6],[1,4,7],[2,5,8]];
        for (var count = 0; count < pops.length; count++){
            var pop = pops[count]; //gets the 'i'th list from the pops list
            if (board_tiles[pop[0]].innerHTML.localeCompare(board_tiles[pop[1]].innerHTML)==0 && 
                board_tiles[pop[1]].innerHTML.localeCompare(board_tiles[pop[2]].innerHTML)==0){
                if (board_tiles[pop[0]].innerHTML !=  ""){
                    winner = board_tiles[pop[0]].innerHTML;
                    plays++;
                    runWinner();
                }
            }           
        }
    }

    function runWinner(){
        if (winner=="X"){wins[0]++}
        else if (winner =="O"){ wins[1]++}
        status.innerHTML = "Congratulations! " + winner + " is the Winner!";
        console.log(status.innerHTML);
        status.classList.add("you-won");
        lock();
    }

   function mark_play(ele){
       var player = players[plays%2];
       ele.innerHTML = player;
       ele.style.pointerEvents = 'none';
       ele.classList.add(player);
       checkWinner();
       player = players[++plays%2];
   }

   function clear(){
       status.classList.remove("you-won");
       winner = "";
       status.innerHTML = points();
       for (i=0;i<board_tiles.length;i++){
           board_tiles[i].classList.remove(...players);
           board_tiles[i].innerHTML = "";
           board_tiles[i].style.pointerEvents = "auto";
       }
    }

    function lock(){
        for (i=0;i<9;i++){
            board_tiles[i].style.pointerEvents = 'none';
        }
    }

}