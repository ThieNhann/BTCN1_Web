document.addEventListener('DOMContentLoaded', () => {
    const field = document.querySelector('.drag-field');
    let draggedItem = null;

    const placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');

    function handleDragStart(e) {
        draggedItem = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', '');

        setTimeout(() => {
            this.classList.add('dragging');
        }, 0);
    }

    function handleDragEnd(e) {
        if (!draggedItem) return;

        if (placeholder.parentNode) {
            placeholder.parentNode.replaceChild(draggedItem, placeholder);
        }

        draggedItem.classList.remove('dragging');
        draggedItem = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
        if (!draggedItem) return;

        const target = e.target.closest('.animal-item');

        if (target && target !== draggedItem) {
            const rect = target.getBoundingClientRect();
            const isAfter = e.clientX > rect.left + rect.width / 2;

            if (isAfter) {
                field.insertBefore(placeholder, target.nextSibling);
            } else {
                field.insertBefore(placeholder, target);
            }
        }
    }

    function addDragEventsToItem(item) {
        item.draggable = true;
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    }

    field.addEventListener('dragover', handleDragOver);

    field.querySelectorAll('.animal-item').forEach(addDragEventsToItem);

    const addNewAnimalButton = document.getElementById('addNewAnimal');
    addNewAnimalButton.addEventListener('click', () => {
        const selectedAnimal = document.getElementById('animalSelect');
        const animalName = selectedAnimal.value;
        const animalIcon = selectedAnimal.options[selectedAnimal.selectedIndex].text;

        const animalItem = document.createElement('div');
        animalItem.classList.add('animal-item');
        animalItem.innerHTML = `<div class="animal-icon">${animalIcon}</div>
                                <div class="animal-name">${animalName}</div>`;

        field.appendChild(animalItem);
        addDragEventsToItem(animalItem);
    });
});