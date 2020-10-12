window.onload = function(){
    let myPlays = [];
    const T = 'X';
    const F = 'O';
    let turn;
    counted = 0;
    const myboard = document.getElementById('board').getElementsByTagName('div');
    let youWon = document.getElementById('status');
    var dict = {'X' : 0, 'O' : 0};
    const body = document.body.style;
    body.width = '100vw';
    body.height = '100vh';

    function solveForWinner(selection){
        var a = myPlays[1-1] == myPlays[2-1] && myPlays[2-1] == myPlays[3-1] && myPlays[3-1] == selection;
        var b = myPlays[4-1] == myPlays[5-1] && myPlays[5-1] == myPlays[6-1] && myPlays[5-1] == selection;
        var c = myPlays[7-1] == myPlays[8-1] && myPlays[7-1] == myPlays[9-1] && myPlays[7-1] == selection;
        var d = myPlays[1-1] == myPlays[4-1] && myPlays[1-1] == myPlays[7-1] && myPlays[1-1] == selection;
        var e = myPlays[2-1] == myPlays[5-1] && myPlays[2-1] == myPlays[8-1] && myPlays[2-1] == selection;
        var f = myPlays[3-1] == myPlays[6-1] && myPlays[3-1] == myPlays[9-1] && myPlays[3-1] == selection;
        var g = myPlays[1-1] == myPlays[5-1] && myPlays[1-1] == myPlays[9-1] && myPlays[1-1] == selection;
        var h = myPlays[3-1] == myPlays[5-1] && myPlays[3-1] == myPlays[7-1] && myPlays[3-1] == selection;
        
        if (a || b || c || d || e || f || g || h ){
            turn = T;
            const winner = selection;
            dict[winner] += 1 
            let dox = 0
            for (dox ; dox < myboard.length; dox++) {
                var box =  myboard[dox];
                box.style.pointerEvents = 'none';
            }
            youWon.classList.add('you-won');
            youWon.textContent="Congratulations! " + winner + " is the Winner!";
        } 
        myPlays = [];
        if ((counted == 9) && (!a && !b & !c & !d && !e && !f && !g && !h )){
            youWon.textContent="It's a DRAW! Press 'New Game' to Play Again!";
        }
        
    }
    
    function choices(){
        for (let o = 0; o < 9; o++){
            myPlays.push(myboard[o].innerHTML);
        }
    }

    function placeMark(box, turnclass){
        box.classList.add(turnclass);
        if (turnclass == T) {
            box.classList.remove(F);
            box.classList.add(T);
            box.innerHTML = T;
            turn = F;
        }
        else if (turnclass == F) {
            box.innerHTML = F;
            box.classList.remove(T);
            box.classList.add(F);
            turn = T;
        }
        box.style.pointerEvents = 'none';
        choices();
        solveForWinner(turnclass);
    }

    function addSquare(item, index) {
        item.classList.add('square');
    }
    
    function addListeners() {
        myPlays = [];
        turn = T;
        var square = 0;
        for (square; square < myboard.length; square++){
            const box = myboard[square];
            box.addEventListener('click', handleclick => {
                counted++;
                const thisClass = turn;
                placeMark(box, thisClass);
            });
    
            box.addEventListener('mouseover', function() {
                box.classList.add('hover');
            });
    
            box.addEventListener('mouseout', function() {
                box.classList.remove('hover');
            })
        }
    }

    addListeners();
        var i;
        for (i = 0; i < myboard.length; i++){
            addSquare(myboard[i], i);
        }
    
        let new_game_btn = document.getElementsByClassName("btn")[0];
            
        new_game_btn.addEventListener('click', myfunc => {
            let dex = 0
            for (dex; dex < myboard.length; dex++) {
                var box = myboard[dex];
                box.classList.remove(T);
                box.classList.remove(F);
                box.innerHTML='';
                box.style.pointerEvents = 'auto';
                youWon.classList.remove('status.you-won');
                youWon.textContent="Move your mouse over a square and click to play as 'Team X' (wins: " + dict[T] + ") or as 'Team O' (wins: " + dict[F] + ").";
                counted = 0;
                youWon.classList.remove('you-won');
            }
            myPlays = [];
            turn = T;
            //addListeners();
        }) 
}