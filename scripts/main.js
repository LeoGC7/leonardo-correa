// This function returns an array of cards
async function fetchCardsData() {
    try {
        const response = await fetch('https://leogc7.github.io/wdd231/cards.json');

        if (!response.ok) {
            throw new Error(`Response error: Status ${response.status}`)
        }

        const data = await response.json();

        return data

    } catch (error) {
        throw new Error(`Error in fetching data: ${error}`)
    }
}

// This funciton receives an array of skills, creates a ul and for each skill in the array creates a li
function createSkillsList(skillsArray) {
    const skillList = document.createElement('ul');
    skillList.classList.add('skill-list')

    skillsArray.forEach(skill => {
        const skillElement = document.createElement('li');
        skillElement.textContent = String(skill);

        skillList.appendChild(skillElement);
    })

    return skillList
}

// This function iterates over each card and returns the skills for each one of them
async function getSkillsFromCards() {
    const cards = await fetchCardsData();

    const skillsArrays = cards.map(card => card.skills);

    return skillsArrays;
}

// This function creates the card element using the function createSkillsList
function buildCardElement(card) {
    const ulOfSkills = createSkillsList(card.skills)

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = 
    `
        <div class="card-image-container">
            <p class="skill-title">${card.title}</p>
            <img src="${card.image}" alt="${card.title} logo" class="skill-image">
        </div>
    `

    cardElement.appendChild(ulOfSkills)

    return cardElement;
}

// This function renders the cards and append them to the DOM
async function renderCards() {
    const skillsContainer = document.querySelector('.skills-container');

    skillsContainer.innerHTML = ''

    try {
        const cards = await fetchCardsData();

        cards.forEach(card => {
            const cardElement = buildCardElement(card);
            skillsContainer.appendChild(cardElement)
        })
    } catch (error) {
        console.log('Erro ao renderiar os cards:', error.message)
    }
}

renderCards()