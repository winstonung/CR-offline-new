/**
 * Represents a playable card in Clash Royale.
 * Stores details such as name, icon URL, rarity, and whether it's a champion or evolution card.
 * If the card is an evolution card, it also tracks its current and maximum evolution cycles.
 * If the card is a champion, Card.isChampion() returns true.
 */
class Card {
    /**
     * Creates an instance of a card. You can usually get these details from the Clash Royale API, but here they 
     * are stored in cards.json .
     * @param {*} name - The name of the card (string).
     * @param {*} icon - The icon URL of the card (string).
     * @param {*} rarity - The rarity level of the card (string).
     * @param {*} ischampion - Whether the card is a champion (boolean).
     * @param {*} isevolution - Whether the card is an evolution card (boolean).
     */
    constructor(name, icon, rarity, ischampion, isevolution) {
        this.name = name;
        this.icon = icon;
        this.rarity = rarity;
        this.ischampion = ischampion;
        this.isevolution = isevolution;
    }

    /**
     * Sets the evolution details for the card. Only applicable if the card is an evolution card, else does nothing.
     * @param {*} currentCycle - The current evolution cycle (int).
     * @param {*} maxCycle - The maximum evolution cycle (int).
     */
    setEvolutionDetails(currentCycle, maxCycle) {
        if (!this.isevolution) {
            return;
        }
        this.currentCycle = currentCycle;
        this.maxCycle = maxCycle;
    }

    /**
     * Gets the name of the card.
     * @returns {string} - The name of the card.
     */
    getName() {
        return this.name;
    }

    /**
     * Gets the icon URL of the card.
     * @returns {string} - The icon URL of the card.
     */
    getIcon() {
        return this.icon;
    }

    /**
     * Checks if the card is an evolution card.
     * @returns {boolean} - True if the card is an evolution card, false otherwise.
     */
    isEvolution() {
        return this.isevolution;
    }

    /**
     * Checks if the card is a champion.
     * @returns {boolean} - True if the card is a champion, false otherwise.
     */
    isChampion() {
        return this.ischampion;
    }

    /**
     * Increases the evolution cycle of the card. Wraps around if it exceeds the maximum cycle.
     */
    increaseCycle() {
        if (this.isEvolution()) {
            this.currentCycle += 1;
            this.currentCycle = this.currentCycle % (this.maxCycle + 1);
        }
    }

    /**
     * Gets the current evolution cycle of the card.
     * @returns {int} - The current evolution cycle, or -1 if the card is not an evolution card.
     */
    getCurrentCycle() {
        if (this.isEvolution()) {
            return this.currentCycle;
        }
        return -1;
    }

    /**
     * Gets the maximum evolution cycle of the card.
     * @returns {int} - The maximum evolution cycle, or -1 if the card is not an evolution card.
     */
    getMaxCycle() {
        if (this.isEvolution()) {
            return this.maxCycle;
        }
        return -1;
    }

    /**
     * Checks if the card is equal to another card. This ignores evolution cycles.
     * @param {*} otherCard - The other card to compare against.
     * @returns {boolean} - True if the cards are equal, false otherwise.
     */
    equals(otherCard) {
        return this.name === otherCard.getName();
    }

    toString() {
        return this.name;
    }
}



/**
 * Represents a deck of cards. Usually, a deck has 8 cards,
 * but this class can also represent the draw pile (4 cards) or active hand (4 cards).
 * Cards are stored in an array, with null values representing empty slots.
 */
class Cards {
    /**
     * Represents a deck of cards.
     * @param {*} num - The number of cards in the deck.
     */
    constructor(num) {
        this.cards = [];
        for (let i = 0; i < num; i++) {
            this.cards.push(null);
        }
    }
    

    /**
     * Adds a card to the end of the deck.
     * @param {*} card - The card to add.
     */
    pushCard(card) {
        this.cards.push(card);
    }

    /**
     * Removes and returns the first card in the deck. Returns null if the deck is empty.
     * @returns {Card} - The first card in the deck, or null if the deck is empty.
     */
    popCardAtStart() {
        return this.cards.shift();
    }

    /**
     * Inserts a card at the specified index. Not to be confused with Cards.replace().
     * @param {*} index - The index to insert the card at.
     * @param {*} card - The card to insert.
     */
    insert(index, card) {
        this.cards.splice(index, 0, card);
    }

    /**
     * Gets the array of cards in the deck.
     * @returns {Array} - The array of cards in the deck.
     */
    getCards() {
        return this.cards;
    }

    /**
     * Checks if the deck contains a specific card.
     * @param {*} card - The card to check for.
     * @returns {boolean} - True if the deck contains the card, false otherwise.
     */
    contains(card) {
        if (card === null) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i] === null) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i] !== null) {
                    if (this.cards[i].equals(card)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Removes a card from the deck, and adjusts each element so there are no gaps in the array.
     * @param {*} card - The card to remove.
     * @returns {int} - The index of the removed card, or -1 if the card was not found.
     */
    removeCard(card) {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i] !== null) {
                if (this.cards[i].equals(card)) {
                    for (let j = i; j < this.cards.length - 1; j++) {
                        this.cards[j] = this.cards[j+1];
                    }
                    this.cards.pop();
                    return i;
                }
            }
        }

        return -1;
    }

    /**
     * Replaces the card at the specified index with a new card. Not to be confused with Cards.insert().
     * @param {*} index - The index of the card to replace.
     * @param {*} card - The new card to place at the index.
     */
    replace(index, card) {
        this.cards[index] = card;
    }

    /**
     * Returns a copy of the Cards object.
     * @returns {Cards} - A copy of the Cards object.
     */
    copy() {
        const newCards = new Cards(this.cards.length);
        for (let i = 0; i < this.cards.length; i++) {
            newCards.cards[i] = this.cards[i];
        }
        return newCards;
    }
}



let drawpile = new Cards(4);
let activehand = new Cards(4);
let deck = new Cards(8);


const cycle = {
    "drawpile": drawpile,
    "activehand": activehand,
    "deck": deck,
    "championInDeck": null,
    "cardsPlayed": 0,
    "actions": [
        [drawpile.copy(),
        activehand.copy(),
        deck.copy(),
        null,
        0]
    ]
};

const searchInput = document.getElementById("cardSearch");
const resultsDiv = document.getElementById("searchResults");

let cards = {}; // will hold loaded data

// Load JSON file
fetch("cards.json")
  .then(response => response.json())
  .then(data => {
    cards = data;
  })
  .catch(err => console.error("Error loading cards.json:", err));

// Normalize function for lenient search
function normalize(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ""); // strip punctuation, dots, spaces
}

function parseSearch(raw) {
    const q = raw.toLowerCase().trim();

    if (q.startsWith("evo")) {
        return {
            type: "evolution",
            rest: normalize(q.slice(3))
        };
    }

    if (q.startsWith("hero")) {
        return {
            type: "hero",
            rest: normalize(q.slice(4))
        };
    }

    return {
        type: "normal",
        rest: normalize(q)
    };
}

function matchesSearch(card, rawInput) {
    const { type, rest } = parseSearch(rawInput);
    const name = card.name.toLowerCase();
    const normName = normalize(name);

    // EVO search
    if (type === "evolution") {
        if (!name.includes("(evolution)")) return false;
        return rest === "" || normName.includes(rest);
    }

    // HERO search
    if (type === "hero") {
        if (!name.includes("hero")) return false;
        return rest === "" || normName.includes(rest);
    }

    // Normal search
    return normName.includes(rest);
}

searchInput.addEventListener("input", () => {
    const query = normalize(searchInput.value);
    resultsDiv.innerHTML = ""; // clear old results

    if (query.length === 0) return;

    for (let key in cards) {
        const card = cards[key];
        if (matchesSearch(card, searchInput.value)) {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("search-card");

            cardDiv.innerHTML = `
                <img src="${card.icon}" alt="${card.name}">
                <span>${card.name}</span>
            `;

             // ✅ Make the result clickable
            cardDiv.addEventListener("click", () => {
                clickedCardFromSearch(card);
            });

            resultsDiv.appendChild(cardDiv);
        }
    }
});


let selectedIndex = -1;
// Keyboard navigation
searchInput.addEventListener("keydown", (e) => {
    const results = resultsDiv.querySelectorAll(".search-card");
    if (!results.length) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % results.length;
        updateSelection(results);
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + results.length) % results.length;
        updateSelection(results);
    }
    else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex === -1) selectedIndex = 0;
        if (selectedIndex >= 0) {
            const cardName = results[selectedIndex].querySelector("span").textContent;
            const card = cards[cardName];
            selectedIndex = -1; // reset selection
            clickedCardFromSearch(card);
        }
    }
});

function updateSelection(items) {
    items.forEach(item => item.classList.remove("selected"));
    if (selectedIndex >= 0) {
        items[selectedIndex].classList.add("selected");
        items[selectedIndex].scrollIntoView({ block: "nearest" });
    }
}

function clickedCardFromSearch(card) {

    // Example: show selected card above results
    let selectedCard = new Card(
        card.name,
        card.icon,
        card.rarity,
        card.isChampion,
        card.isEvolution
    );

    if (selectedCard.isEvolution()) {
        selectedCard.setEvolutionDetails(card.currentcycle, card.maxcycle);
    }
    if (addCard(selectedCard)) {
        if (useCard(selectedCard)) {
            saveState();
            updateStyles();
        }
    }

    // Clear search input and results
    searchInput.value = "";
    resultsDiv.innerHTML = "";
}

function resetAll() {
    cycle = {
        "drawpile": [
            null, null, null, null
        ],
        "activehand": [
            null, null, null, null
        ],
        "deck": [
            null, null, null, null, null, null, null, null
        ],
        "championInDeck": null,
        "cardsPlayed": 0,
        "actions": []
    };
}


function useCard(card) {
    if (!cycle.activehand.contains(card)) {
        return false;
    }

    if (card === null) {
        return false;
    }

    if (card.isEvolution()) {
        card.increaseCycle();
    }


    let index = cycle.activehand.removeCard(card);
    let newcard = cycle.drawpile.popCardAtStart();
    cycle.activehand.insert(index, newcard);
    cycle.drawpile.pushCard(card);

    cycle.cardsPlayed += 1;
    return true;
}

function addCard(card) {
    if (card === null) {
        return false;
    }

    if (!cycle.drawpile.contains(null) && !cycle.activehand.contains(null)) {
        return false;
    }

    if (cycle.activehand.contains(card) || cycle.drawpile.contains(card) || cycle.deck.contains(card)) {
        return false;
    }

    cycle.activehand.replace(cycle.activehand.getCards().indexOf(null), card);

    return true;
}

function saveState() {
    cycle.actions.push(
        [
            cycle.drawpile.copy(),
            cycle.activehand.copy(),
            cycle.deck.copy(),
            cycle.championInDeck,
            cycle.cardsPlayed
        ]
    );
    return true;
}


function undo() {
    if (cycle.actions.length === 1) {
        return false;
    }

    cycle.actions.pop();
    let lastAction = cycle.actions[cycle.actions.length - 1];

    cycle.drawpile = lastAction[0].copy();
    cycle.activehand = lastAction[1].copy();
    cycle.deck = lastAction[2].copy();
    cycle.championInDeck = lastAction[3];
    cycle.cardsPlayed = lastAction[4];

    return true;
}  


function updateStyles() {
    for (let i = 0; i < cycle.activehand.getCards().length; i++) {
        let element = document.getElementById(`activehand${i+1}`);
        let card = cycle.activehand.getCards()[i];
        if (card === null) {
            element.src = "MysteryCard.png";
        } else {
            element.src = card.getIcon();
        }
        element = document.getElementById(`cycle-activehand${i+1}`);
        if (card != null) {
            if (card.isEvolution()) {
                element.textContent = `${card.getCurrentCycle()}/${card.getMaxCycle()}`;
                element.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
            }
        } else {
            element.style.visibility = "hidden";
        }
    }

    for (let i = 0; i < cycle.drawpile.getCards().length; i++) {
        let element = document.getElementById(`drawpile${i+1}`);
        let card = cycle.drawpile.getCards()[i];
        if (card === null) {
            element.src = "MysteryCard.png";
        } else {
            element.src = card.getIcon();
        }
        element = document.getElementById(`cycle-drawpile${i+1}`);
        if (card != null) {
            if (card.isEvolution()) {
                element.textContent = `${card.getCurrentCycle()}/${card.getMaxCycle()}`;
                element.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
            }
        } else {
            element.style.visibility = "hidden";
        }
    }

    let element = document.getElementById("drawpile4");
    let textElement = document.getElementById("cycle-drawpile4");
    if (cycle.drawpile.getCards().length != 4) {
        element.style.visibility = "hidden";
        textElement.style.visibility = "hidden";
    } else {
        element.style.visibility = "visible";
        if (cycle.drawpile.getCards()[3] != null) {
            if (cycle.drawpile.getCards()[3].isEvolution()) {
                textElement.style.visibility = "visible";
            } else {
                textElement.style.visibility = "hidden";
            }
        }
    }

    let cardSearchElement = document.getElementById("cardSearch");
    let searchResultsElement = document.getElementById("searchResults");
    if (!cycle.drawpile.contains(null) && !cycle.activehand.contains(null)) {
        cardSearchElement.style.visibility = "hidden";
        searchResultsElement.style.visibility = "hidden";
    } else {
        cardSearchElement.style.visibility = "visible";
        searchResultsElement.style.visibility = "visible";
    }

    document.getElementById("cardsplayed").innerHTML = `Cards played<br><span>${cycle.cardsPlayed}</span>`;
}


function useCardFromDrawPile(card) {
    if (card === null) {
        return false;
    }

    if (!cycle.drawpile.contains(card)) {
        return false;
    }

    if (card.isEvolution()) {
        card.increaseCycle();
    }


    cycle.drawpile.removeCard(card);
    cycle.drawpile.pushCard(card);


    cycle.cardsPlayed += 1;
    return true;
}

function clickedCardFromActiveHand(index) {
    let card = cycle.activehand.getCards()[index];
    if (useCard(card)) {
        saveState();
        updateStyles();
    }
}

function clickedCardFromDrawPile(index) {
    let card = cycle.drawpile.getCards()[index];
    if (useCardFromDrawPile(card)) {
        saveState();
        updateStyles();
    }
}

document.getElementById("activehand1").addEventListener("click", () => clickedCardFromActiveHand(0));
document.getElementById("activehand2").addEventListener("click", () => clickedCardFromActiveHand(1));
document.getElementById("activehand3").addEventListener("click", () => clickedCardFromActiveHand(2));
document.getElementById("activehand4").addEventListener("click", () => clickedCardFromActiveHand(3));
document.getElementById("drawpile1").addEventListener("click", () => clickedCardFromDrawPile(0));
document.getElementById("drawpile2").addEventListener("click", () => clickedCardFromDrawPile(1));
document.getElementById("drawpile3").addEventListener("click", () => clickedCardFromDrawPile(2));
document.getElementById("drawpile4").addEventListener("click", () => clickedCardFromDrawPile(3));
document.getElementById("undoButton").addEventListener("click", () => {
    if (undo()) {
        updateStyles();
    }
});

document.addEventListener("keydown", function (event) {
    // Windows/Linux: Ctrl+Z
    // Mac: Meta (Command)+Z
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        undo();
        updateStyles();
    }
});

updateStyles();