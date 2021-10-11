window.onload = function(){
    let game_number = 1;
    let winner = "";
    let wins = [0,0];
    let plays = 0;
    var player = "X";
    const game = document.getElementById("game");
    const status = document.getElementById("status");
    const gameboard = document.getElementById("board");
    const board_tiles = gameboard.getElementsByTagName("div");
    // const controls = document.getElementsByClassName("controls")[0];
    const new_game = document.getElementsByClassName("btn");
    const players = ["X","O"];
    const para = document.createElement("div");
    para.innerHTML = "Let's Begin, Player '"+player+"'!";
    let caption = document.createElement("caption");
    let x_score = document.createElement("td");
    let o_score = document.createElement("td");
    x_score.innerHTML = wins[0];
    o_score.innerHTML = wins[1]; 
    style_xo();
    points_table();

    game.insertBefore(para, gameboard);
    new_game[0].style.margin = "10px 80px";
    para.style.marginBottom = "15px";
    para.style.backgroundColor = "#cbd5e0";
    para.style.fontSize = "24px";
    para.style.width = "250px";
    para.style.fontWeight = "bold";
    para.style.textAlign = "center";
    para.style.borderRadius = ".25rem";

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
        update_points();
    }

    function update_points(){
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
        let score_table = document.createElement("table");
        game.insertBefore(score_table,gameboard);
        caption.innerHTML = "Game # "+game_number+"! Match Points";
        score_table.appendChild(caption);

        let tb_row1 = document.createElement("tr"); //creates header row
        let x_head = document.createElement("td"); //creates X header cell
        let o_head = document.createElement("td"); //creates O header cell
        x_head.innerHTML = players[0]; //sets the X header data
        o_head.innerHTML = players[1]; //sets the O header data
        tb_row1.appendChild(x_head); //places the X header cell into row
        tb_row1.appendChild(o_head); //places the O cell header into row
        score_table.appendChild(tb_row1);

        let tb_row2 = document.createElement("tr");
        
        tb_row2.appendChild(x_score);
        tb_row2.appendChild(o_score);
        score_table.appendChild(tb_row2);

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

   function mark_play(ele){
       player = players[plays%2];
       ele.innerHTML = player;
       ele.style.pointerEvents = 'none';
       ele.classList.add(player);
       checkWinner();
       player = players[++plays%2];
       style_xo();
       turn_tracker();
   }

   function turn_tracker(){
    para.innerHTML = "It Is Player "+player+"'s Turn!";
   }

   function clear(){
       caption.innerHTML = "Game # "+game_number+"! Match Points";
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