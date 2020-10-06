const wrongLettersEl = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const popupContainer = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playButton = document.getElementById("play-button");
const notificationContainer = document.getElementById("notification-container");
const figureParts = document.querySelectorAll(".figure-part");
let gameover = false

const words = [
  "hammer",
  "blender",
  "knife",
  "drink",
  "dress",
  "payment",
  "watch",
];
const wrongLetters = [];
const correctLetters = [];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const displayWord = () => {
  word.innerHTML = selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter"> ${correctLetters.includes(letter) ? letter : ""}</span>`
    )
    .join("");
  const innerWord = word.innerText.replace(/\n/g, "");
  if (selectedWord === innerWord) {
    finalMessage.innerText = "Congratulations, you won!";
    popupContainer.style.display = "flex";
  }
};

const showNotification = () => {
    notificationContainer.classList.add("show")
    setTimeout(()=> {
        notificationContainer.classList.remove("show")
    }, 2000)
}

const updateWrongLetters = () => {
    wrongLettersEl.innerHTML = 
    `${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
     ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
figureParts.forEach((part, index) => {
    if(index < wrongLetters.length){
        part.style.display = "block"
    }
    else{
        part.style.display = "none"
    }
})

if(wrongLetters.length === figureParts.length){
    gameover = true
    finalMessage.innerText = "Unfortunately you lost!"
    popupContainer.style.display = "flex"
}
    
}



document.addEventListener("keydown", (e)=> {
    if( e.keyCode >=  65 && e.keyCode  <= 90){
        const letter = e.key
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                if(!gameover){
                    correctLetters.push(letter)
                    displayWord()
                }
                
            }else {
                showNotification()
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
                if(!gameover){
                wrongLetters.push(letter)
                updateWrongLetters()
                }
            }else{
                showNotification()
            }
        }
    }
})


// Restart Game
playButton.addEventListener("click", () => {
    wrongLetters.splice(0)
    correctLetters.splice(0)
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord()
    updateWrongLetters()
    gameover = false
    popupContainer.style.display = "none"

})
displayWord()