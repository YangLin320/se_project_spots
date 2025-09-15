const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inputErrorClass: "modal__input_state_error",
}

const hasInvalidInput = (inputList) =>{
    return inputList.some((input) =>{
        return !input.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)){
        disableButton(buttonElement);
    }else{
        buttonElement.disabled = false;
    }
}

const disableButton = (buttonElement) => {
    buttonElement.disabled = true;
}


const hideInputError = (config,form, inputElement) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(config.inputErrorClass);
    
}

const showInputError = (form, inputElement, message) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = message;
    inputElement.classList.add(config.inputErrorClass);
}

const checkInputValidity = (config,form, inputElement) =>{
    if(!inputElement.validity.valid){
        showInputError(config,form, inputElement, inputElement.validationMessage);
    }else{
        hideInputError(config,form, inputElement);
    }
}

const setEventListeners = (config,form)=>{
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);
    inputList.forEach(inputElement =>{
        inputElement.addEventListener("input", function(){
            checkInputValidity(config,form, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (config)=>{
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach(form => {
        setEventListeners(config,form);
    });
}

enableValidation(settings,);