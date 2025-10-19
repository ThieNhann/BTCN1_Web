document.addEventListener('DOMContentLoaded', function()  {
    console.log("loaded");
    const sidebar = document.querySelector('.aside');
    const newsItems = document.querySelectorAll('.news-item');

    newsItems.forEach(item => {
        const header = item.querySelector('.news-header');
        const icon = item.querySelector('.drop-down-icon');
        let isActive = item.classList.contains('active');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
            isActive = !isActive;
            if (isActive) { 
                icon.textContent = '|';
            }
            else {
                icon.textContent = '▶';
                icon.style.fontSize = '20px';
            }
        })  
    })
})