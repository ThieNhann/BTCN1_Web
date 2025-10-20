document.addEventListener('DOMContentLoaded', () => {
    let sample = document.querySelector('.sampleStyle span');

    const textColorPicker = document.getElementById('textColor');
    const backgroundColorPicker = document.getElementById('backgroundColor');
    const boldCheckbox = document.getElementById('boldCheckbox');
    const italicCheckbox = document.getElementById('italicCheckbox');
    const underlineCheckbox = document.getElementById('underlineCheckbox');
    const settingButton = document.querySelector('.moreSettingButton');
    const popupBox = document.getElementById('settingsPopup');

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

});