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

    function highlight(string) {
        const regex = new RegExp(string, 'g');
        
        const color = sample.style.color || 'initial';
        const backgroundColor = sample.style.backgroundColor || 'transparent';
        const textDecoration = sample.style.textDecoration || 'none';
        const fontWeight = sample.style.fontWeight || 'normal';
        const fontStyle = sample.style.fontStyle || 'normal';
        
        const styleAttribute = `style="color: ${color}; 
                                background-color: ${backgroundColor}; 
                                text-decoration: ${textDecoration}; 
                                font-weight: ${fontWeight}; 
                                font-style: ${fontStyle};"`;

        const replaceString = `<span data-text="${string}" ${styleAttribute}>$&</span>`;
        
        const baseContent = paragraph.textContent;
        const newText = baseContent.replace(regex, replaceString);
        paragraph.innerHTML = newText;
    }

    resetButton.addEventListener('click', () => {
        paragraph.innerHTML = originalTextContent;
    })

});