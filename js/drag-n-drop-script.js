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


    const animalItems = document.querySelectorAll('.animal-item');
    let draggedItem = null;

    animalItems.forEach(item => {
        item.setAttribute('draggable', true);
    });

    animalItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });

    function handleDragStart(e) {
        draggedItem = this;
        setTimeout(() => {
            this.classList.add('dragging');
        }, 0);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML); 
    }

    function handleDragOver(e) {
        e.preventDefault();
        if (this !== draggedItem) {
            const afterElement = getDragAfterElement(field, e.clientY);

            document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
            
            if (afterElement == null) {
                field.appendChild(this).classList.add('drag-over'); 
            } else {
                field.insertBefore(this, afterElement.element);
                this.classList.add('drag-over');
            }
        }
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.stopPropagation();

        if (draggedItem !== this) {
            const afterElement = getDragAfterElement(field, e.clientY);
            
            if (afterElement == null) {
                field.appendChild(draggedItem);
            } else {
                field.insertBefore(draggedItem, afterElement.element);
            }
        }
        
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        return false;
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        draggedItem = null;
    }

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