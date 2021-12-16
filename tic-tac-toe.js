window.onload = function(){
    let game_number = 1; plays = 0; wins = [0,0]; winner = ""; 
    let player = "X";
    const game = document.getElementById("game");
    const status = document.getElementById("status");
    const gameboard = document.getElementById("board");
    const board_tiles = gameboard.getElementsByTagName("div");
    const new_game = document.getElementsByClassName("btn");
    const players = ["X","O"];
    

    const para = document.createElement("div");
    let score_table = document.createElement("table");
    let caption = document.createElement("caption");
    let tb_row1 = document.createElement("tr"); 
    let tb_row2 = document.createElement("tr");
    let x_head = document.createElement("td"); 
    let o_head = document.createElement("td");
    let x_score = document.createElement("td"); 
    let o_score = document.createElement("td");
    x_score.innerHTML = wins[0]; o_score.innerHTML = wins[1];
     
    style_xo(); points_table(); newElements_andStyles();

    for (var tile = 0; tile < board_tiles.length; tile++){
        let ex = board_tiles[tile];
        ex.classList.add("square");
        ex.addEventListener("mouseover", function(){ex.classList.add("hover")})
        ex.addEventListener("mouseout", function(){ex.classList.remove("hover")})
        ex.addEventListener("click", function(){mark_play(ex)})
    }

    new_game[0].addEventListener("click", function(){clear()})

    function checkWinner(){
        var pops = [[0,1,2],[3,4,5],[6,7,8], [0,4,8],[2,4,6], [0,3,6],[1,4,7],[2,5,8]];
        for (var count = 0; count < pops.length; count++){
            var pop = pops[count]; //gets the 'i'th list from the pops list
            if (board_tiles[pop[0]].innerHTML.localeCompare(board_tiles[pop[1]].innerHTML)==0 && 
                board_tiles[pop[1]].innerHTML.localeCompare(board_tiles[pop[2]].innerHTML)==0 &&
                board_tiles[pop[0]].innerHTML !=  ""){
                winner = board_tiles[pop[0]].innerHTML;
                plays++;
                runWinner();
            }          
        }
    }

    function runWinner(){
        if (winner=="X"){wins[0]++}
        else if (winner =="O"){ wins[1]++}
        status.innerHTML = "Congratulations! " + winner + " is the Winner!";
        status.classList.add("you-won");
        for (i=0;i<9;i++){board_tiles[i].style.pointerEvents = 'none'};
        game_number++;
        x_score.innerHTML = wins[0];
        o_score.innerHTML = wins[1];    
    }

    function style_xo(){
        para.style.padding = "15px 5px";
        if(player=="X"){para.style.color = "#3182ce"}
        else {para.style.color = "#E57996"};
    }

    function points_table(){
        caption.innerHTML = "Game # "+game_number+"! Match Points";
        x_head.innerHTML = players[0]; //sets the X header data
        o_head.innerHTML = players[1]; //sets the O header data
        tb_row1.append(x_head,o_head); //places the X and O header cells into row 1
        tb_row2.append(x_score,o_score); //places the X and O data cells into row 2
        score_table.append(caption,tb_row1,tb_row2);
    }
    
    function mark_play(ele){
       player = players[plays%2];
       ele.innerHTML = player;
       ele.style.pointerEvents = 'none';
       ele.classList.add(player);
       checkWinner();
       player = players[++plays%2];
       style_xo();
       para.innerHTML = "It Is Player "+player+"'s Turn!";
   }
   
   function clear(){
       caption.innerHTML = "Game # "+game_number+"! Match Points";
       status.classList.remove("you-won");
       winner = "";
       status.innerHTML = "Move your mouse over a square and click to play an X or an O.";
       for (i=0;i<board_tiles.length;i++){
           board_tiles[i].classList.remove(...players);
           board_tiles[i].innerHTML = "";
           board_tiles[i].style.pointerEvents = "auto";
       }
    }

    function newElements_andStyles(){
        game.insertBefore(score_table,gameboard);
        game.insertBefore(para, gameboard);

        new_game[0].style.margin = "10px 80px";
        
        para.innerHTML = "Let's Begin, Player '"+player+"'!";
        para.style.marginBottom = "15px";
        para.style.backgroundColor = "#cbd5e0";
        para.style.fontSize = "24px";
        para.style.width = "250px";
        para.style.fontWeight = "bold";
        para.style.textAlign = "center";
        para.style.borderRadius = ".25rem";

        caption.style.fontWeight = "bold";
        caption.style.color = "gray";
        tb_row1.style.color = "white";
        tb_row1.style.background = "#32ABE1";
        tb_row1.style.fontSize = "18px";
        tb_row1.style.fontWeight = "bold";
        score_table.style.marginBottom = "30px";
        tb_row2.style.fontWeight = "bold";
        tb_row2.style.color = "gray";
        score_table.style.width = "300px";
        score_table.style.textAlign = "center";
    }

}