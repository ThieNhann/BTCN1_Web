document.addEventListener('DOMContentLoaded', () => {
    const field = document.querySelector('.drag-field');
    let draggedItem = null;

    function handleDragStart(e) {
        draggedItem = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', '');
    }

    function handleDragEnd(e) {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        const target = e.target.closest('.animal-item');
        if (!target || target === draggedItem) return;

        // Lấy toàn bộ danh sách item hiện tại
        const items = [...field.querySelectorAll('.animal-item')];
        const draggedIndex = items.indexOf(draggedItem);
        const targetIndex = items.indexOf(target);

        // Hoán đổi vị trí dựa vào hướng chuột
        const rect = target.getBoundingClientRect();
        const beforeHalf = e.clientY < rect.top + rect.height / 2;

        if (draggedIndex < targetIndex && beforeHalf) {
            field.insertBefore(draggedItem, target);
        } else if (draggedIndex > targetIndex && !beforeHalf) {
            field.insertBefore(draggedItem, target.nextSibling);
        } else if (draggedIndex < targetIndex) {
            field.insertBefore(draggedItem, target.nextSibling);
        } else {
            field.insertBefore(draggedItem, target);
        }
    }

    function addDragEventsToItem(item) {
        item.draggable = true;
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    }

    field.querySelectorAll('.animal-item').forEach(addDragEventsToItem);
    field.addEventListener('dragover', handleDragOver);

    // Thêm nút "Add new" như cũ
    const addNewAnimalButton = document.getElementById('addNewAnimal');
    addNewAnimalButton.addEventListener('click', () => {
        const selectedAnimal = document.getElementById('animalSelect');
        const animalName = selectedAnimal.value;
        const animalIcon = selectedAnimal.options[selectedAnimal.selectedIndex].text;

        const animalItem = document.createElement('div');
        animalItem.classList.add('animal-item');
        animalItem.innerHTML = `
            <div class="animal-icon">${animalIcon}</div>
            <div class="animal-name">${animalName}</div>
        `;

        field.appendChild(animalItem);
        addDragEventsToItem(animalItem);
    });
});
