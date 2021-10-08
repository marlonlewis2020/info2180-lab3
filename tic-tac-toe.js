window.onload = function(){
    let winner = "";
    let wins = [0,0];
    let win = False;
    var gameboard = document.getElementById("board");
    var board_tiles = gameboard.getElementsByTagName("div");
    let plays = 0;
    const new_game = document.getElementsByClassName("btn");
    const players = ['X','O'];
    
    for (var tile = 0; tile < board_tiles.length; tile++){
        let ex = board_tiles[tile];
        ex.classList.add("square");
        ex.addEventListener("mouseover", function(){
            ex.classList.add("hover");
        })
        ex.addEventListener("mouseout", function(){
            ex.classList.remove("hover");
        })
        ex.addEventListener("click", function(){
            mark_play(ex);
        })
    }

    function checkWinner(){
        var pops = [[0,1,2],[3,4,5],[6,7,8], [0,4,8],[2,4,6], [0,3,6],[1,4,7],[2,5,8]];
        for (var count = 0; count < pops.length; count++){
            var pop = pops[count]; //gets the 'i'th list from the pops list
            var set = []; // list to store the 'pop' list index arrangement of board_tiles innerHTML values
            for (i=0;i<3;i++){set.push(board_tiles[pop[i]])}
            if (set[0]==set[1]==set[2]){
                winner = set[0];
                if (winner == "X"){wins[0]++}
                else if(winner == "O"){wins[1]++}
                win = true;
                lock();
                runWinner(); //function not yet created
            }
        }
        //board_tiles[count].innerHTML;
    }

    function runWinner(){
        return;
    }

    new_game[0].addEventListener("click", function(){
        clear();
    })

   function mark_play(ele){
       var player = players[plays%2];
       ele.innerHTML = player;
       ele.style.pointerEvents = 'none';
       ele.classList.add(player);
       player = players[++plays%2];
   }

   function clear(){
       for (i=0;i<board_tiles.length;i++){
           board_tiles[i].classList.remove(...players);
           board_tiles[i].innerHTML = "";
           board_tiles[i].style.pointerEvents = "auto";
       }
    }

    function lock(){
        for (i=0;i<9;i++){
            board_tiles[1].style.pointerEvents = 'none';
        }
    }

}