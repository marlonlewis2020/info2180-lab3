window.onload = function(){
    const T = 'square.X';
    const F = 'square.O'
    let turn = T;

    const myboard = document.getElementById('board').getElementsByTagName('div');

    function placeMark(box, turnclass){
        box.classList.add(turnclass);
        if (turnclass == T) {
            box.classList.remove('square.O');
            box.classList.add('square.X');
            box.innerHTML = '<strong>X</strong>';
            turn = F;
        }
        else if (turnclass == F) {
            box.innerHTML = '<strong>O</strong>';
            box.classList.remove('square.X');
            box.classList.add('square.O');
            turn = T;
        }
        
    }

    var square;
    for (square = 0; square < myboard.length; square++){
        const box = myboard[square];
        box.addEventListener('click', handleclick => {
            console.log(box);
            const thisClass = turn;// ? T : F; 
            placeMark(box, thisClass);
        });

        
        box.addEventListener('mouseover', function() {
            box.classList.add('hover');
        })

        box.addEventListener('mouseout', function() {
            box.classList.remove('hover');
        })
    }

    function addSquare(item, index) {
        item.classList.add('square');
    }

    var i;
    for (i = 0; i < myboard.length; i++){
        addSquare(myboard[i], i);
        console.log(myboard[i]);
    }

    let new_game_btn = document.getElementsByClassName("btn")[0];

    new_game_btn.addEventListener('click', myfunc => {
        for (let dex = 0; dex < myboard.length; dex++) {
            console.log(myboard[dex]);
            myboard[dex].classList.remove('square.X');
            myboard[dex].classList.remove('square.O');
            myboard[dex].innerHTML='';
            
        }
    })

}