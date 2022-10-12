// Selectores y variables
const formLogin = document.querySelector("#formLogin");
const inputs = document.querySelectorAll("#formLogin input");
const btnLogin = document.querySelector("#btnLogin");

const regex = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{6,15}$/,
};

const validation = {
  email: false,
  password: false,
};

// Validaciones
const validateForm = (e) => {
  switch (e.target.name) {
    case "email":
      validateInput(regex.email, e.target, "email");
      //   console.log(regex.email, e.target, "email");
      break;
    case "password":
      validateInput(regex.password, e.target, "password");
      //   console.log(regex.password, e.target, "password");
      break;
  }
};

const validateInput = (expression, input, type) => {
  if (expression.test(input.value)) {
    document
      .querySelector(`.form__group--${type} .alert-error`)
      .classList.add("hidden");
    validation[type] = true;
    validateNonEmptyInputs();
  } else {
    document
      .querySelector(`.form__group--${type} .alert-error`)
      .classList.remove("hidden");
    validation[type] = false;
    validateNonEmptyInputs();
  }
};

// funciones
function validateNonEmptyInputs() {
  const allInputsForm = Array.from(inputs);

  for (let i = 0; i < allInputsForm.length; i++) {
    if (allInputsForm[i].value === "") {
      disableButton();
      return;
    }
  }

  if (validation.email && validation.password) {
    enableButton();
  } else {
    disableButton();
  }
}

function disableButton() {
  btnLogin.disabled = true;
  btnLogin.classList.remove('cursor-pointer');
  btnLogin.classList.add('cursor-not-allowed');
}

function enableButton() {
  btnLogin.disabled = false;
  btnLogin.classList.remove('cursor-not-allowed');
  btnLogin.classList.add('cursor-pointer');
}

// eventos
inputs.forEach((input) => {
  input.addEventListener("keyup", validateForm);
  input.addEventListener("blur", validateForm);
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validation.email && validation.password) {
    formLogin.reset();

    const formSuccess = document.querySelector(".alert-success");
    formSuccess.classList.remove("hidden");
    setTimeout(() => {
      formSuccess.classList.add("hidden");
    }, 3000);

    enableButton();
  } else {
    formSuccess.classList.add("hidden");
    disableButton();
  }
});
