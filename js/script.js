document.addEventListener('DOMContentLoaded', function()  {
    const sidebar = document.querySelector('aside');
    const newsItems = document.querySelectorAll('.news-item');

    newsItems.forEach(item => {
        const header = item.querySelector('.news-header');
        const icon = item.querySelector('.drop-down-icon');
        let isActive = item.classList.contains('active');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
            isActive = item.classList.contains('active');
            if (isActive) { 
                icon.textContent = '|';
            }
            else {
                icon.textContent = '▶';
                icon.style.fontSize = '20px';
            }
        });

        header.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.classList.add('dragging');
            }, 0);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging')
        })
    })

    let draggedItem = null;

    sidebar.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(sidebar, e.clientY);

        if (afterElement == null) {
            sidebar.appendChild(draggedItem);
        } else {
            sidebar.insertBefore(draggedItem, afterElement);
        }

    }) 

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.news-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, {offset: Number.NEGATIVE_INFINITY }).element;
    }
})