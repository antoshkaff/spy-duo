const mainElement = document.querySelector('main');

const whoWinTitle = document.querySelector('.who-win-title');

const firstPlayerButton = document.getElementById('first-player');
const firstPlayerModal = document.querySelector('.first-player');
const firstPlayerScoreElement = document.querySelector('.first-player-score');
const firstPlayerCard = document.querySelector('.first-player p');
const firstPlayerWord = document.querySelector('.first-player-word');

const secondPlayerButton = document.getElementById('second-player');
const secondPlayerModal = document.querySelector('.second-player');
const secondPlayerScoreElement = document.querySelector('.second-player-score');
const secondPlayerCard = document.querySelector('.second-player p');
const secondPlayerWord = document.querySelector('.second-player-word');

const hideButtons = document.querySelectorAll('.hide-button');

const startGameButton = document.querySelector('.start-game-button');

const aboutGameButton = document.querySelector('.about-game');
const aboutGameInfo = document.querySelector('.about-game-info');

let isFirstPlayerButtonClicked = false;
let isSecondPlayerButtonClicked = false;
let firstPlayerScore = 0;
let secondPlayerScore = 0;
let isChooseActive = false;

const isTouchDevice = window.matchMedia('(hover: none)').matches;

function activateChoose(chooseStatus) {
    isChooseActive = true;
    if (chooseStatus) {
        cardsNoHover(false);
        cardsDefaultHover(false);
        cardsChooseModeHover(true);

        startGameButton.classList.add('disabled');

        isFirstPlayerButtonClicked = false;
        isSecondPlayerButtonClicked = false;
        whoWinTitle.style.display = 'inline';

        if(isTouchDevice){
            firstPlayerButton.classList.add('show');
            secondPlayerButton.classList.add('show');
        }
    } else {
        cardsNoHover(true)
        cardsDefaultHover(false);
        cardsChooseModeHover(false);
        isChooseActive = false;

        startGameButton.classList.remove('disabled');
        whoWinTitle.style.display = 'none';

        if(isTouchDevice){
            firstPlayerButton.classList.remove('show');
            secondPlayerButton.classList.remove('show');
        }
    }
}

function updateScore(player) {
    if (player === 'first') {
        firstPlayerScore++;
        firstPlayerScoreElement.textContent = firstPlayerScore;
    } else if (player === 'second') {
        secondPlayerScore++;
        secondPlayerScoreElement.textContent = secondPlayerScore;
    }
}

function getRandomLocations() {
    let isSpy = crypto.getRandomValues(new Uint8Array(1))[0] % 2 === 0;
    let currentLocations = []
    if (isSpy) {
        let randomLocation = locations[Math.floor(Math.random() * locations.length)];
        currentLocations.push(randomLocation, randomLocation);
    } else {
        for (let i = 0; i < 2; i++) {
            currentLocations.push(locations[Math.floor(Math.random() * locations.length)])
        }
    }
    return currentLocations
}

function cardsNoHover(status) {
    if (status) {
        firstPlayerButton.classList.add('no-hover');
        secondPlayerButton.classList.add('no-hover');
    } else {
        firstPlayerButton.classList.remove('no-hover');
        secondPlayerButton.classList.remove('no-hover');
    }
}

function cardsDefaultHover(status) {
    if (status) {
        firstPlayerButton.classList.add('default-hover');
        secondPlayerButton.classList.add('default-hover');
    } else {
        firstPlayerButton.classList.remove('default-hover');
        secondPlayerButton.classList.remove('default-hover');
    }
}

function cardsChooseModeHover(status) {
    if (status) {
        firstPlayerButton.classList.add('choose-mode-hover');
        secondPlayerButton.classList.add('choose-mode-hover');
    } else {
        firstPlayerButton.classList.remove('choose-mode-hover');
        secondPlayerButton.classList.remove('choose-mode-hover');
    }
}

function cardsDisable(status) {
    if (status) {
        firstPlayerButton.classList.add('disabled');
        secondPlayerButton.classList.add('disabled');
    } else {
        firstPlayerButton.classList.remove('disabled');
        secondPlayerButton.classList.remove('disabled');
    }
}

function showPlayerWords(status) {
    if (status) {
        firstPlayerWord.style.display = 'inline';
        secondPlayerWord.style.display = 'inline';
    } else {
        firstPlayerWord.style.display = 'none';
        secondPlayerWord.style.display = 'none';
    }
}

function hideUI(status) {
    if(status) {
        firstPlayerButton.style.display = 'none';
        secondPlayerButton.style.display = 'none';
        startGameButton.style.display = 'none';
        aboutGameButton.style.display = 'none';
    } else {
        firstPlayerButton.style.display = 'flex';
        secondPlayerButton.style.display = 'flex';
        startGameButton.style.display = 'block';
        aboutGameButton.style.display = 'block';
    }
}

aboutGameButton.addEventListener('click', () => {
    hideUI(true);
    aboutGameInfo.classList.add('active');
    aboutGameInfo.style.opacity = '1';
});

firstPlayerButton.addEventListener('click', () => {
    if (!isFirstPlayerButtonClicked && !isChooseActive) {
        firstPlayerButton.classList.remove('default-hover');
        firstPlayerButton.classList.add('no-hover');

        firstPlayerModal.classList.add('active');
        firstPlayerModal.style.opacity = '1';

        isFirstPlayerButtonClicked = true;
        hideUI(true);
    } else if (isChooseActive) {
        updateScore('first');
        activateChoose(false)
        showPlayerWords(true);
        cardsDisable(true);
    }
});

secondPlayerButton.addEventListener('click', () => {
    if (!isSecondPlayerButtonClicked && !isChooseActive) {
        secondPlayerButton.classList.remove('default-hover');
        secondPlayerButton.classList.add('no-hover');

        secondPlayerModal.classList.add('active');
        secondPlayerModal.style.opacity = '1';

        isSecondPlayerButtonClicked = true;
        hideUI(true);
    } else if (isChooseActive) {
        updateScore('second');
        activateChoose(false)
        showPlayerWords(true);
        cardsDisable(true);
    }
});

[firstPlayerButton, secondPlayerButton].forEach(button => {
    button.addEventListener('click', () => {
        if (isFirstPlayerButtonClicked && isSecondPlayerButtonClicked && !isChooseActive) {
            activateChoose(true)
        }
    });
});

hideButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const modal = event.target.closest('.card-view') || aboutGameInfo;
        modal.classList.remove('active');

        aboutGameInfo.classList.remove('active');

        aboutGameButton.classList.remove('disabled');

        modal.style.opacity = '0';
        aboutGameInfo.style.opacity = '0';
        hideUI(false);
    });
});

const locations = [
    "Store", "Hospital", "School", "Park", "Restaurant", "Stadium", "Beach",
    "Cinema", "Museum", "Library", "Theater", "Zoo", "Waterpark",
    "Church", "Airport", "Train", "Metro", "Farm", "Supermarket", "Bar",
    "Cafe", "Bank", "Garage", "Office", "Prison", "Ship", "Airplane", "Wedding",
    "Mountain", "Forest", "Concert", "Club", "Pool", "Pharmacy", "Mine", "Warehouse",
    "Market", "Resort", "Hostel", "Camp", "Kitchen", "Atelier", "Factory",
    "Circus", "TV Studio", "Cottage", "Court", "Pier", "Storage", "Photo Studio",
    "Post Office", "Bunker", "Lighthouse", "Cave", "Festival", "Shooting Range", "Kremlin", "Town Hall",
    "Park", "Library", "Mine", "Hill", "Castle", "Tavern", "Farm",
    "River", "Lake", "Harbor", "Station", "Bridge", "Stadium", "Bank", "Barracks",
    "Inn", "Plant", "Lagoon", "Kitchen", "Fort", "Terrace",
    "Fair", "Zoo", "Market", "Harbor", "Observatory", "Nursery", "Trail",
    "Villa", "Bank", "Beach", "Brewery", "Confectionery", "Workshop", "Pond", "Rotunda"
];

startGameButton.addEventListener('click', () => {
    cardsDisable(false);
    cardsNoHover(false);
    cardsDefaultHover(true);

    startGameButton.innerHTML = 'NEXT ROUND';

    let [firstLocation, secondLocation] = getRandomLocations();
    firstPlayerCard.textContent = firstLocation;
    secondPlayerCard.textContent = secondLocation;

    firstPlayerWord.textContent = firstLocation;
    secondPlayerWord.textContent = secondLocation;
    showPlayerWords(false);
});

mainElement.addEventListener('click', (event) => {
    const isClickOutsideModals = !firstPlayerModal.contains(event.target) &&
        !secondPlayerModal.contains(event.target) &&
        !aboutGameInfo.contains(event.target) &&
        !firstPlayerButton.contains(event.target) &&
        !secondPlayerButton.contains(event.target) &&
        !aboutGameButton.contains(event.target);

    if (isClickOutsideModals) {
        hideUI(false);
        if (firstPlayerModal.classList.contains('active')) {
            firstPlayerModal.classList.remove('active');
            firstPlayerModal.style.opacity = '0';
        }
        if (secondPlayerModal.classList.contains('active')) {
            secondPlayerModal.classList.remove('active');
            secondPlayerModal.style.opacity = '0';
        }
        if (aboutGameInfo.classList.contains('active')) {
            aboutGameInfo.classList.remove('active');
            aboutGameInfo.style.opacity = '0';
        }
    }
});