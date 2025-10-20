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
        animalItem.setAttribute('draggable', true);
        animalItem.innerHTML = `<div class="animal-icon"></div>
                                <div class="animal-name"></div>`;
        
        const iconElement = animalItem.querySelector('.animal-icon');
        const nameElement = animalItem.querySelector('.animal-name');

        iconElement.textContent = animalIcon;
        nameElement.textContent = animalName;

        animalItem.addEventListener('dragstart', handleDragStart);
        animalItem.addEventListener('dragover', handleDragOver);
        animalItem.addEventListener('dragleave', handleDragLeave);
        animalItem.addEventListener('drop', handleDrop);
        animalItem.addEventListener('dragend', handleDragEnd);

        field.appendChild(animalItem);
    })

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.animal-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const rect = child.getBoundingClientRect();
            const offset = y - rect.top - rect.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, {offset: Number.NEGATIVE_INFINITY }).element;
    }
})