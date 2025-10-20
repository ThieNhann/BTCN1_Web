document.addEventListener('DOMContentLoaded', () => {
    let sample = document.querySelector('.sampleStyle span');
    sample.style.color = '#ff0000';
    sample.style.backgroundColor = '#ffff00';
    sample.style.fontWeight = 'normal';
    sample.style.fontStyle = 'normal';
    sample.style.textDecoration = 'none';

    const originalParagraph = document.querySelector('.text-field p');
    const paragraph = document.querySelector('.text-field p');
    const originalTextContent = originalParagraph.textContent;
    const textColorPicker = document.getElementById('textColor');
    const backgroundColorPicker = document.getElementById('backgroundColor');
    const boldCheckbox = document.getElementById('boldCheckbox');
    const italicCheckbox = document.getElementById('italicCheckbox');
    const underlineCheckbox = document.getElementById('underlineCheckbox');
    const settingButton = document.querySelector('.moreSettingButton');
    const popupBox = document.getElementById('settingsPopup');
    popupBox.style.display = 'none';
    const highlightButton = document.getElementById('highlightButton');
    const deleteButton = document.getElementById('deleteButton');
    const resetButton = document.getElementById('resetButton');


    textColorPicker.addEventListener('input', (event) => {
        sample.style.color = event.target.value;
    })

    backgroundColorPicker.addEventListener('input', (event) => {
        sample.style.backgroundColor = event.target.value;
    })

    boldCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            sample.style.fontWeight = 'bold';
        }
        else {
            sample.style.fontWeight = 'normal';
        }
    })

    italicCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            sample.style.fontStyle = 'italic';
        }
        else {
            sample.style.fontStyle = 'normal';
        }
    })

    underlineCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            sample.style.textDecoration = 'underline';
        }
        else {
            sample.style.textDecoration = 'none';
        }
    })

    settingButton.addEventListener('click', () => {
        if (popupBox.style.display === 'none') {
            popupBox.style.display = 'flex';
        }
        else {
            popupBox.style.display = 'none';
        }
    })

    highlightButton.addEventListener('click', () => {
        const textToHighlight = document.getElementById('sampleTextField').value;
        highlight(textToHighlight);
    });
});