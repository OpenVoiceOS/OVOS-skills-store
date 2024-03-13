// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://openvoiceos.github.io/OVOS-skills-store/skills.json')
        .then(response => response.json())
        .then(data => {
            const skillsContainer = document.getElementById('skills-container');

            data.items.forEach(skill => {
                const card = createSkillCard(skill);
                skillsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching skills:', error));
});

function createSkillCard(skill) {
    const card = document.createElement('div');
    card.classList.add('skill-card');

    const icon = document.createElement('img');
    icon.src = skill.icon;
    card.appendChild(icon);

    const title = document.createElement('h3');
    title.textContent = skill.name;
    card.appendChild(title);

    const description = document.createElement('p');
    description.textContent = skill.description;
    card.appendChild(description);

    const examplesTitle = document.createElement('h4');
    examplesTitle.textContent = "Examples:";
    card.appendChild(examplesTitle);

    const examplesList = document.createElement('ul');
    skill.examples.forEach(example => {
        const exampleItem = document.createElement('li');
        exampleItem.textContent = example;
        examplesList.appendChild(exampleItem);
    });
    card.appendChild(examplesList);

    return card;
}
