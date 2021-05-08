const WORDS = ["book", "stocks", "principle", "monitor", "program", "application", "keyboard", "javascript", "gaming", "network", "gamestop", "amazon", "dogecoin"]
const IMGS = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"]
let countGuess;

function generateWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function createUIDashes(w) {
    let dashesWordEle= document.getElementById("main_dashes");
    let letter;
    for (let i = 0; i < w.length; i++) {
        letter = document.createElement("span");
        letter.setAttribute("class", "dashes");
        letter.setAttribute("id", "hidden" + i);
        letter.innerHTML = "-";
        dashesWordEle.append(letter);
    }
}

function removeUIDashes(idEle){
    let dashesWordEle= document.getElementById(idEle);
    while (dashesWordEle.hasChildNodes()) {
        dashesWordEle.removeChild(dashesWordEle.firstChild);
    }
}

function changeImg(numberImg){
    let imgEle = document.getElementById("main_img");
    imgEle.src = "imgs/" + IMGS[numberImg];
}

function endGame(){
    let tempEle = document.getElementById('main_alphabet').getElementsByTagName('a');
    for (let i=0; i < tempEle.length; i++)
        tempEle[i].onclick = function() {
            return false;
        }
}

function setupGame(){
    let word = WORDS[Math.floor(Math.random() * WORDS.length)];
    let wordArr = Array.from(word.toUpperCase());
    let guessArr = Array.from(wordArr).fill('*');
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let alphabetHtml = document.getElementById("main_alphabet");
    let newEle;
    createUIDashes(word);
    countGuess  = 0;
    changeImg(countGuess);
    alphabet.forEach(function (x) {
        newEle = document.createElement("a");
        newEle.className = "waves-effect waves-light btn letterSelected";
        newEle.id = x;
        newEle.innerHTML = x;
        newEle.onclick = function (){
            let ans = x;
            let selectedEle = document.getElementById(ans);
            selectedEle.classList.add('disabled');
            if(wordArr.includes(ans)){
                let dashesItem;
                for (let i=0; i<wordArr.length; i++){
                    if (wordArr[i] == ans){
                        guessArr[i] = ans;
                        dashesItem = document.getElementById("hidden" + i);
                        dashesItem.innerHTML = ans;
                    }
                }
                if (guessArr.toString() == wordArr.toString()){
                    endGame();
                    let winHtml = '<div class="container center-align"> <span><i class="material-icons left">mood</i>You win!</span></div>';
                    M.toast({html: winHtml, displayLength: 500000, classes:  "pulse green darken-1"});
                }
            }else{
                countGuess++;
                changeImg(countGuess);
                if (countGuess == IMGS.length-1){
                    endGame();
                    let loseHtml = '<div class="container center-align"> <span><i class="material-icons left">mood_bad</i>Game Over!</span></div>';
                    M.toast({html: loseHtml, displayLength: 500000, classes:  "pulse  red darken-2"});
                }
            }
        }
        alphabetHtml.append(newEle);
    })
}

function playAgain(){
    M.Toast.dismissAll();
    removeUIDashes("main_dashes");
    removeUIDashes("main_alphabet");
    setupGame();
}

window.onload = function() {
    setupGame();
}
