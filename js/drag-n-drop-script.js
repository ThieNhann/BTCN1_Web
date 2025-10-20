document.addEventListener('DOMContentLoaded', () => {
    let selectedAnimal = document.getElementById('animalSelect');
    const addNewAnimalButton = document.getElementById('addNewAnimal');
    const field = document.querySelector('.drag-field');
    
    addNewAnimalButton.addEventListener('click', () => {
        selectedAnimal = document.getElementById('animalSelect');
        let animalName = selectedAnimal.value;
        let animalIcon = selectedAnimal.options[selectedAnimal.selectedIndex].text;

        const animalItem = document.createElement('div');
        animalItem.classList.add('animal-item');
        animalItem.innerHTML = `<div class="animal-icon"></div>
                                <div class="animal-name"></div>`;
        
        const iconElement = animalItem.querySelector('.animal-icon');
        const nameElement = animalItem.querySelector('.animal-name');

        iconElement.textContent = animalIcon;
        nameElement.textContent = animalName;

        field.appendChild(animalItem);
    })
})