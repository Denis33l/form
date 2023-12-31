"use strict"

import './index.html';
import './index.scss'



document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = JSON.stringify(
            {
                "name": e.target[0].value,
                "email": e.target[1].value,
                "phone": e.target[2].value,
                "comments": e.target[3].value,
            })

        if (error === 0) {
            form.classList.add('_sending');
            // let Data = Object.fromEntries(new FormData(form).entries());
            // let formData = JSON.stringify(Data);   The server stopped working, I didn't have time to check this code, but it should work instead of the previously declared FormData variable

            let response = await fetch('http://localhost:9090/api/registration', {
                method: 'POST',
                body: formData

            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert("Error");
                form.classList.remove('_sending');
            }
        }
        else {
            alert('Fill in the required fields');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        console.log(formReq);


        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            console.log(input);
            formRemoveError(input);

            if (input.classList.contains('_phone')) {
                if (phoneTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
            if (input.getAttribute("type") === "checkbox" && !input.checked) {
                formAddError(input);
                error++;
            }
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
            else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.classList.add('_error')
    }
    function formRemoveError(input) {
        input.classList.remove('_error')
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
    function phoneTest(input) {
        return /^\+375\s?\(?(17|25|29|33|44)\)?\s?\d{3}-\d{2}-\d{2}$/.test(input.value);
    }
});


//Popup
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const popupClose = popup.querySelector('.popup__close');
    const popupBackground = popup.querySelector('.popup__background');
    const openPopupButton = document.getElementById('openPopupButton');

    function openPopup() {
        popup.classList.add('active');
        document.body.classList.add('popup-open');
    }

    function closePopup() {
        popup.classList.remove('active');
        document.body.classList.remove('popup-open');
    }

    function closePopupOnBackgroundClick(event) {
        if (event.target === popupBackground) {
            closePopup();
        }
    }

    openPopupButton.addEventListener('click', openPopup);
    popupClose.addEventListener('click', closePopup);
    popupBackground.addEventListener('click', closePopupOnBackgroundClick);
});