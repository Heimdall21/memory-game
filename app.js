// Grab relevant HTML elements
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 20;


// add javascript to HTML document
playerLivesCount.textContent = playerLives;

// generate cards: images and names of card
const getData = () => [
  {imgSrc: './images/beatles.jpeg', name: "beatles"},
  {imgSrc: './images/blink182.jpeg', name: "blink 182"},
  {imgSrc: './images/fkatwigs.jpeg', name: "fka twigs"},
  {imgSrc: './images/fleetwood.jpeg', name: "fleetwood"},
  {imgSrc: './images/joy-division.jpeg', name: "joy division"},
  {imgSrc: './images/ledzep.jpeg', name: "led zeppelin"},
  {imgSrc: './images/metallica.jpeg', name: "metallica"},
  {imgSrc: './images/pinkfloyd.jpeg', name: "pink floyd"},
  {imgSrc: './images/beatles.jpeg', name: "beatles"},
  {imgSrc: './images/blink182.jpeg', name: "blink 182"},
  {imgSrc: './images/fkatwigs.jpeg', name: "fka twigs"},
  {imgSrc: './images/fleetwood.jpeg', name: "fleetwood"},
  {imgSrc: './images/joy-division.jpeg', name: "joy division"},
  {imgSrc: './images/ledzep.jpeg', name: "led zeppelin"},
  {imgSrc: './images/metallica.jpeg', name: "metallica"},
  {imgSrc: './images/pinkfloyd.jpeg', name: "pink floyd"}
];

// function that randomizes card

const randomize = () => {
  const cardData = getData();
  // this randomizes the array
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
}

// Card generator function
const cardGenerator = () => {
  const cardData = randomize();

  let gameStatus = 0;
  // Generate the HTML
  cardData.forEach((item, index) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';

    // attach info to card
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);

    // attach the cards to the "section" html element
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    // add event listener to card
    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard');
      gameStatus = checkCards(e)
      
    })
    
  })
}

// check cards 
const checkCards = (e) => {
  const clickedCard = e.target;
  console.log(clickedCard);
  clickedCard.classList.add('flipped');

  const flippedCards = document.querySelectorAll('.flipped');
  

  console.log(flippedCards)
   
  // logic for two flipped cards
  if(flippedCards.length === 2){
    if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
      console.log("match");
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      })

      // if everything is flipped

    }else{
      console.log("wrong");
      // remove all the "flipped cards" class
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1000);
      })

      playerLives--;
      playerLivesCount.textContent = playerLives
      if(playerLives === 0){
        setTimeout(() => restart("Try again"), 1000);
      }
    }
  }

  const toggleCard = document.querySelectorAll('.toggleCard');
  // run a check to see if we won the game
  if(toggleCard.length === 16){
    setTimeout(() => restart("You won the game"), 1000);
  }
}

const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');

  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');

    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);
      section.style.pointerEvents = 'all';
    }, 1000);
    
  })

  playerLives = 20;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => {
    window.alert(text)
  }, 100);
  
}




cardGenerator();

