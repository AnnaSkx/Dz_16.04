const formElem = document.forms[0];
const cardsElem = document.querySelector('#cards');
const searchElem = document.querySelector('#search');

const wordElem = formElem.word;
const colorElem = formElem.color;
const translationElem = formElem.translation;



const get_card = () => JSON.parse(localStorage.getItem('card')) || [];
const add_card = card => localStorage.setItem('card', JSON.stringify([...get_card(),card]));
const remove_card = card =>{
    const new_lst_card = get_card().filter(elem => elem.word !== card.word);
    localStorage.setItem('card', JSON.stringify(new_lst_card))
}

function render(words) {
    cardsElem.innerText = '';
    for (let i = 0; i < words.length; i++) {
        const card = document.createElement('div');
        const cardsWordElem = document.createElement('p');
        const pTranslationElem = document.createElement('p');
        cardsWordElem.classList.add('active');


		const closeElem = document.createElement('div');
        closeElem.addEventListener('click', () => {
            remove_card(words[i]);
            render(get_card());
        });


		card.addEventListener('dblclick', event => {
			if (cardsWordElem.className === 'active') {
				cardsWordElem.classList.remove('active');
				pTranslationElem.classList.add('active');
				cardsWordElem.innerText = get_card()[i].translation;
			} else {
				pTranslationElem.classList.remove('active');
				cardsWordElem.innerText = get_card()[i].word;
				cardsWordElem.classList.add('active');
			}
		});

        closeElem.classList.add('close');
        card.classList.add('card');

        card.append(cardsWordElem, closeElem);
        cardsElem.appendChild(card);

        closeElem.innerText = 'X';
        cardsWordElem.innerText = words[i].word;
        card.style.backgroundColor = words[i].color;
    };
};


formElem.addEventListener('submit', event => {
    event.preventDefault();
    if (wordElem.value != '' && translationElem.value != '' && colorElem.value != '') {
        add_card({
            word: wordElem.value,
            translation: translationElem.value,
            color: colorElem.value,
        });
    } else {
        alert('Заполните все поля!');
    }
    wordElem.value = '';
    colorElem.value = '';
    translationElem.value = '';
    render(get_card());
});





searchElem.addEventListener('input', event => {
    const value = event.target.value;
    render(value.length ? get_card().filter(elem => elem.word.startsWith(value)) : get_card());
});


render(get_card())