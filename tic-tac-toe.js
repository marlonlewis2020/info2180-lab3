window.onload = function(){
    let myPlays = [];
    const T = 'X';
    const F = 'O';
    let turn = T;
    counted = 0;
    const myboard = document.getElementById('board').getElementsByTagName('div');
    let youWon = document.getElementById('status');

    console.log(youWon);

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
                const winner = selection;
                for (let dex = 0; dex < myboard.length; dex++) {
                    //myboard[dex].removeEventListener('click', handleclick(myboard[dex]));
                }
                console.log("We have a winner");
                youWon.classList.add('you-won');
                youWon.textContent="Congratulations! " + winner + " is the Winner!";
                return
            }
        myPlays = [];
    }
    
    function choices(){
        for (let o = 0; o < 9; o++){
            myPlays.push(myboard[o].innerHTML);
        }
        console.log(myPlays);
    }

    function placeMark(box, turnclass){
        box.classList.add(turnclass);
        if (turnclass == T) {
            box.classList.remove(F);
            box.classList.add(T);
            box.innerHTML = T;
            turn = F;
            choices();
            solveForWinner(turnclass);
        }
        else if (turnclass == F) {
            box.innerHTML = F;
            box.classList.remove(T);
            box.classList.add(F);
            turn = T;
            choices();
            solveForWinner(turnclass);
        }
        //testing remove #1
        box.removeEventListener('click', handleclick => {
            counted++;
            const thisClass = turn;
            placeMark(box, thisClass);
        });
    }

    function addSquare(item, index) {
        item.classList.add('square');
    }
    
    function addListeners() {
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
            for (let dex = 0; dex < myboard.length; dex++) {
                myboard[dex].classList.remove(T);
                myboard[dex].classList.remove(F);
                myboard[dex].innerHTML='';
                youWon.classList.remove('status.you-won');
                youWon.textContent="Move your mouse over a square and click to play an X or an O.";
                counted = 0;
                turn = T;
                youWon.classList.remove('you-won');
                //myboard[dex].removeEventListener('click', handleclick(myboard[dex]));
            }
            addListeners();
        }) 

}