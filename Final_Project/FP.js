    const grid = document.getElementById("grid");
    const currentVolumeText = document.getElementById("currentVolume");
    const message = document.getElementById("message");
    const desiredVolumeInput = document.getElementById("desiredVolume");
    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");
    const hideDiv = document.getElementById("pop");
    const closeBtn = document.getElementById("closeBtn");

    const totalButtons = 25;
    let realButtonIndex = randomIndex();
    let hiddenVolume = 50;
    let gameOver = false;

    // closeBtn.addEventListener("click", () => {
    //   hideDiv.classList.add("hide");
    // });

    desiredVolumeInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        handleSubmit();
      }
    });

    function randomIndex() {
      return Math.floor(Math.random() * totalButtons);
    }

    function randomVolume() {
      return Math.floor(Math.random() * 101);
    }

    function updateVolumeDisplay() {
      currentVolumeText.textContent = hiddenVolume;
    }

    function buildGrid() {
      grid.innerHTML = "";

      for (let i = 0; i < totalButtons; i++) {
        const button = document.createElement("button");
        button.className = "volume-btn";
        button.textContent = "Volume";
        button.dataset.index = i;
        button.addEventListener("click", handleButtonClick);
        grid.appendChild(button);
      }
    }
      
    function handleButtonClick(event) {
      if (gameOver) return;

      const clickedButton = event.target;
      const clickedIndex = Number(clickedButton.dataset.index);

      clickedButton.classList.remove("wrong", "correct");
      void clickedButton.offsetWidth;

      if (clickedIndex === realButtonIndex) {
        clickedButton.classList.add("correct");

        hiddenVolume = randomVolume();
        updateVolumeDisplay();

        let newIndex;
        do {
          newIndex = randomIndex();
        } while (newIndex === realButtonIndex);
        realButtonIndex = newIndex;

        message.textContent = `Correct! The volume has been changed to ${hiddenVolume}, and the button has moved.`;
      } else {
        clickedButton.classList.add("wrong");
        message.textContent = "Wrong button. That one does not control the volume.";
        //window.open("Wrong button");
      }
    }

    function handleSubmit() {
      if (gameOver) return;

      const desiredValue = Number(desiredVolumeInput.value);

      if (
        desiredVolumeInput.value.trim() === "" ||
        Number.isNaN(desiredValue) ||
        desiredValue < 0 ||
        desiredValue > 100
      ) {
        message.textContent = "Please enter a valid number between 0 and 100.";
        return;
      }

      const difference = Math.abs(desiredValue - hiddenVolume);

      if (difference === 0) {
        message.textContent = `Perfect! You submitted ${desiredValue}, and the hidden volume is exactly ${hiddenVolume}.`;
      } else if (difference <= 5) {
        message.textContent = `Close enough! You submitted ${desiredValue}, and the hidden volume is ${hiddenVolume}.`;
      } else {
        message.textContent = `Not very close. You submitted ${desiredValue}, but the hidden volume is ${hiddenVolume}.`;
      }

      gameOver = true;
      disableGrid();
    }

    function disableGrid() {
      const buttons = document.querySelectorAll(".volume-btn");
      buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.7";
        button.style.cursor = "not-allowed";
      });
    }

    function resetGame() {
      hiddenVolume = 50;
      realButtonIndex = randomIndex();
      gameOver = false;
      desiredVolumeInput.value = "";
      message.textContent = "Try to find the real volume button.";
      updateVolumeDisplay();
      buildGrid();
    }

    submitBtn.addEventListener("click", handleSubmit);
    resetBtn.addEventListener("click", resetGame);

    // desiredVolumeInput.addEventListener("keydown", function(event) {
    //   if (event.key === "Enter") {
    //     handleSubmit();
    //   }
    // });

    // closeBtn.addEventListener("click", () => {
    //   hideDiv.classList.add("hide");
    // });

    updateVolumeDisplay();
    buildGrid();