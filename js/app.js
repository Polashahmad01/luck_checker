// All Game Variables
let min = 1,
    max = 10,
    winningNum = 5,
    chanceLeft = 5;

// All UI Variables
const minNum = document.querySelector('#min'),
    maxNum = document.querySelector('#max'),
    setNumber = document.querySelector('#set-input'),
    guessInput = document.querySelector('#input-value'),
    checkLuck = document.querySelector('#submit'),
    loading = document.querySelector('#loading'),
    message = document.querySelector('.message'),
    chanceRemaining = document.querySelector('h2'),
    game = document.querySelector('.submit');

// Assign to UI min & max variables
minNum.textContent = min;
maxNum.textContent = max;

// Disable input by default
guessInput.disabled = true;


// Listen to setNumber event
setNumber.addEventListener('click', showSpinner);

// Listen to checkLuck event
checkLuck.addEventListener('click', playTheGame);

// Play Again
game.addEventListener('mousedown', function (e) {

    if (e.target.className === 'play-again') {
        window.location.reload();
    }

    e.preventDefault();
})

// Play The Game
function playTheGame() {

    let guess = parseInt(guessInput.value);

    // Check if guessInput is disabled
    if (guessInput.disabled === true) {

        setTimeout(function () {

            // Show spinner
            loading.style.display = 'block';

            // Set Timeout for Loading
            setTimeout(function () {

                // Remove spinner
                loading.remove();

                // Tell User
                setMessage(`Please Set The Number First`);

                // for remove message
                setTimeout(removeMessage, 3000);

                // Play Again
                checkLuck.value = 'Play Again';

                // Add className
                checkLuck.className += 'play-again';

            }, 2000)

        }, 0)

    } else if (guessInput.disabled === false) {

        let guessNumber = parseInt(guessInput.value),
            minInput = parseInt(minNum.value),
            maxInput = parseInt(maxNum.value);

        if (guessNumber < minInput || guessNumber > maxInput) {

            // Tell user
            validateGuessNumber(`Please enter a number between ${minInput} to ${maxInput}`);

            // Remove Msg
            removeValidateMessage();

        } else if (guessNumber === winningNum) {

            // Tell user
            validateGuessNumber(`Congratulations ${guessNumber} is correct, You Win!`);

            // Clear Input
            guessInput.value = '';

            // Disable Input
            guessInput.disabled = true;

            // Play Again
            checkLuck.value = 'Play Again';

            // Add className
            checkLuck.className += 'play-again';

        } else {

            // remove 1 from chanceLeft each time
            chanceLeft -= 1;

            // set chance left
            chanceRemaining.textContent = chanceLeft;

            // Tell User
            validateGuessNumber(`${guessNumber} is not correct`);

            // Remove msg
            removeValidateMessage();

            if (chanceLeft === 0) {

                // Game over
                validateGuessNumber(`Game Over, You Lose`);

                // Play Again
                checkLuck.value = 'Play Again';

                // Add className
                checkLuck.className += 'play-again';

            }

        }
    }
}



// Validate guess
function validateGuessNumber(msg) {

    // Create p element
    const para = document.createElement('p');

    // Add className
    para.className = 'message';

    // Create Text Node & Append
    para.appendChild(document.createTextNode(msg));

    // Get Parents
    const card = document.querySelector('#game');
    const message = document.querySelector('.message');

    // Insert para element
    card.insertBefore(para, message);
}


// Remove Validate Message
function removeValidateMessage() {

    // Set Time
    setTimeout(function () {

        document.querySelector('.message').remove();

    }, 2000)
}



// show spinner
function showSpinner() {

    // Show Spinner
    loading.style.display = 'block';

    // remove spinner after 2s
    setTimeout(removeSpinner, 2000);

    // set Number
    setNumberFromMinMax();

}


// remove spinner
function removeSpinner() {

    // remove spinner
    loading.remove();
}


// set Number
function setNumberFromMinMax() {
    let minGuess = parseInt(minNum.value);
    maxGuess = parseInt(maxNum.value);

    //Validate set number
    if (minGuess <= 0 || maxGuess <= 0) {

        // remove spinner after 2s
        setTimeout(function () {
            loading.remove();

            //Tell User
            setMessage(`Please Enter Positive Number`);

            // Remove Message
            setTimeout(removeMessage, 2000);

            //clear min & max
            clearMinMax(minNum, maxNum);

            //Listen to focus event
            minNum.addEventListener('focus', reloadUI);
            maxNum.addEventListener('focus', reloadUI);

        }, 2000);


    } else if (minGuess > maxGuess) {

        // remove spinner after 2s
        setTimeout(function () {
            loading.remove();

            //Tell User
            setMessage(`First Number Should Lower Than Last Number`);

            // Remove Message
            setTimeout(removeMessage, 2000);

            //clear min & max
            clearMinMax(minNum, maxNum);

            //Listen to focus event
            minNum.addEventListener('focus', reloadUI);
            maxNum.addEventListener('focus', reloadUI);

        }, 2000);
    } else {

        // remove spinner after 2s
        setTimeout(function () {
            loading.remove();

            //Tell User
            setMessage(`Number Has Been Successfully Set`);

            // Remove Message
            setTimeout(removeMessage, 2000);

            // Unblock guessInput
            guessInput.disabled = false;


        }, 2000);
    }
}




// set Message
function setMessage(msg) {

    //set Message
    message.textContent = msg;
}

// Remove Message
function removeMessage(msg) {
    message.remove();
}

// Clear MinMax
function clearMinMax(min, max) {

    //Clear mix & max
    minNum.value = '';
    maxNum.value = '';
}

// reload UI
function reloadUI() {
    window.location.reload();
}
