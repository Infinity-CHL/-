(() => {

  function createTitle() {
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Memory Game';
    return title;
  };

  function createTable() {
    const table = document.createElement('div');
    table.classList.add('table');
    return table;
  };

  function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    return card;
  };

  function createCardGame(container) {
    let gameTitle = createTitle();
    let gameTable = createTable();

    container.append(gameTitle);
    container.append(gameTable);

    const darthVader = 'assets/images/card-value-1.png';
    const bobaFett = 'assets/images/card-value-2.png';
    const chubaka = 'assets/images/card-value-3.png';
    const grido = 'assets/images/card-value-4.png';
    const luke = 'assets/images/card-value-5.png';
    const robot2 = 'assets/images/card-value-6.png';
    const robot = 'assets/images/card-value-7.png';
    const yoda = 'assets/images/card-value-8.png';


    function random(n) {
      return Math.floor(Math.random() * Math.floor(n));
    };

    function shuffle(array) {
      for (let i = 0; i < array.length; i++) {
        let j = random(array.length);
        let k = random(array.length);
        let t = array[j];
        array[j] = array[k];
        array[k] = t;
      }
      return array;
    };

    let frontArray = [darthVader, bobaFett, chubaka, grido, luke, robot2, robot, yoda];
    frontArray = frontArray.concat(frontArray);
    shuffle(frontArray);

    function cloneCard(arr) {
      for (let i = 0; i < arr.length; i++) {
        const card = createCard();
        card.setAttribute('data-character', frontArray[i]);

        const frontCard = document.createElement('img');
        const backCard = document.createElement('img');

        backCard.classList.add('back');
        frontCard.classList.add('front');

        frontCard.src = arr[i];
        backCard.src = 'assets/images/bg.svg';

        gameTable.append(card);
        card.append(backCard);
        card.append(frontCard);
      };
    };

    cloneCard(frontArray);

    function createBtn() {
      let btnContainer = document.createElement('div');
      let btn = document.createElement('button');

      btnContainer.classList.add('btn-container');
      btn.classList.add('btn');

      btn.textContent = 'Сыграть еще раз';

      btnContainer.append(btn)
      document.body.append(btnContainer);

      return btnContainer;
    };

    document.body.append(createBtn());
  };

  window.createCardGame = createCardGame;

  document.addEventListener('DOMContentLoaded', () => {
    createCardGame(document.querySelector('.container'));
    const cards = document.querySelectorAll('.card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add('flip');


      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      };

      secondCard = this;
      lockBoard = true;

      checkForMatch();
    }

    function checkForMatch() {
      let isMatch = firstCard.dataset.character === secondCard.dataset.character;
      isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetBoard();
    }

    function unflipCards() {
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
      }, 1500);
    }

    function resetBoard() {
      hasFlippedCard = false;
      lockBoard = false;
      firstCard = null;
      secondCard = null;
    };

    function finishGameBtn(btn) {
      btn.addEventListener('click', () => {
        lockBoard = false;
        hasFlippedCard = false;

        (function shuffle() {
          cards.forEach(card => {
            card.classList.remove('flip');
            let ramdomPos = Math.ceil(Math.random() * 12);
            card.style.order = ramdomPos;

            card.addEventListener('click', flipCard)
            card.addEventListener('click', () => {
              const amountCards = cards.length;
              const amountFlipCards = document.querySelectorAll('.flip');

              if (amountFlipCards.length == amountCards) {
                let btn = document.querySelector('.btn-container')
                btn.classList.add('active');
                finishGameBtn(document.querySelector('.btn-container'));
              };
            })
          });
        })();
        btn.classList.remove('active')
      })
    };

    cards.forEach(card => card.addEventListener('click', flipCard));

    cards.forEach(card => card.addEventListener('click', () => {
      const amountCards = cards.length;
      const amountFlipCards = document.querySelectorAll('.flip');

      if (amountFlipCards.length == amountCards) {
        let btn = document.querySelector('.btn-container')
        btn.classList.add('active');
        finishGameBtn(document.querySelector('.btn-container'));
      };
    }));
  });

})();
