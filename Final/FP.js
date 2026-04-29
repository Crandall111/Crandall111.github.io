const grid = document.getElementById("grid"); // searches the HTML doc for the id grid.
const currentVolumeText = document.getElementById("current_volume");
const desiredVolumeInput = document.getElementById("desired_volume");
const message = document.getElementById("message");
//const submitButton = document.getElementById("submit_button");
const resetButton = document.getElementById("reset_button");

const total_buttons = 25;
let hiddenVolume = 0;
let realButtonIndex = randomIndex();

function randomIndex() {
    return Math.floor(Math.random() * total_buttons);
}

function randomVolume() {
    return Math.floor(Math.random() * 101);
}

function updateVolumeDisplay() {
    currentVolumeText.textContent = hiddenVolume;
}

// this starts to build the grid
function build_grid() {
    grid.innerHTML = "";

    for (let i = 0; i < total_buttons; i++) {
        const button = document.createElement("button");

        button.className = "volume_button";
        button.textContent = "Volume";
        button.dataset.index = i;
        button.addEventListener("click", handleButtonClick);
        grid.appendChild(button);
    }
}

// This function checks the button the user clicks on 
// If it is correct or not. and will move it if it is correct.
function handleButtonClick(event) {

    const clickedButton = event.target;
    /*
        dataset gets set when building the grid
        dataset gets the value as a string
        Number converts it to a number.
    */
    const clickedIndex = Number(clickedButton.dataset.index); 

    clickedButton.classList.remove("wrong", "correct");
    void clickedButton.offsetWidth;

    if (clickedIndex === realButtonIndex) {
        clickedButton.classList.add("correct");

        hiddenVolume = randomVolume();
        updateVolumeDisplay();

        let new_index;
        do{
            new_index = randomIndex();
        } while (new_index === realButtonIndex) 

        realButtonIndex = new_index;

        message.textContent = `Correct! The volume has been updated to ${hiddenVolume}, and the button has been moved.`;

        build_grid();
    } else {
        clickedButton.classList.add("wrong");
        message.textContent = "Wrong button.";
        //window.alert("Wrong button");
    }

}

// handles the user input on the requested volume.
// function handleSubmit() {
//     const desiredValue = Number(desiredVolumeInput.value);

//     if (desiredValue < 0 || desiredValue > 100) {
//         message.textContent = "Please enter a number between o and 100.";
//         return;
//     }

//     hiddenVolume = desiredValue;
//     updateVolumeDisplay();

//     message.textContent = `The volume has been updated to ${hiddenVolume}.`;
// }

// when the user hits reset it will set everything back to 0.
function resetGrid() {
    hiddenVolume = 0;
    realButtonIndex = randomIndex();
    if (desiredVolumeInput){
        desiredVolumeInput.value = "";
    }
    
    message.textContent = "Try to find the real volume button.";
    updateVolumeDisplay()
    build_grid();
}

resetButton.addEventListener("click", resetGrid);
//submitButton.addEventListener("click", handleSubmit);

updateVolumeDisplay();
build_grid();

