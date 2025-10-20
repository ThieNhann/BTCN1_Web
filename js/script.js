document.addEventListener('DOMContentLoaded', function()  {
    const sidebar = document.querySelector('aside');
    const newsItems = document.querySelectorAll('.news-item');
    let draggedItem = null;

    newsItems.forEach(item => {
        const header = item.querySelector('.news-header');
        const dropDownIcon = item.querySelector('.drop-down-icon');
        const dragIcon = item.querySelector('.drag-icon');
        let isActive = item.classList.contains('active');
        dropDownIcon.addEventListener('click', () => {
            item.classList.toggle('active');
            isActive = item.classList.contains('active');
            if (isActive) { 
                dropDownIcon.textContent = '|';
            }
            else {
                dropDownIcon.textContent = '▶';
                dropDownIcon.style.fontSize = '20px';
            }
        });

        dragIcon.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.classList.add('dragging');
            }, 0);
        });

        dragIcon.addEventListener('dragend', () => {
            item.classList.remove('dragging')
        })
    })

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

    const allLinks = document.querySelectorAll('a');

    allLinks.forEach(clickedLink => {
        clickedLink.addEventListener('click', function(event) {
            event.preventDefault();
            const activateIndex = this.dataset.index;

            allLinks.forEach(link => {
                link.classList.remove('active');
            })

            const linksToActivate = document.querySelectorAll(`a[data-index="${activateIndex}"]`);
            linksToActivate.forEach(link => {
                link.classList.add('active');
            })
        })
    })  
})