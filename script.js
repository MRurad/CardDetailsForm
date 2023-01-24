const $form = document.querySelector("#card-form");
const userName = $form.name.value;
const cardNumber = $form["card-number"].value;
const YY = $form.YY.value;
const MM = $form.MM.value;
const CVC = $form.CVC.value;

function validateName(userName) {
  if (userName.length === 0) {
    return "This field cannot be blank";
  } else if (userName.length > 50) {
    return "This field cannot contain more than 50 characters";
  } else if (!/^[ a-z]+$/i.test(userName)) {
    return "This field can only contain letters";
  } else {
    return "";
  }
}

function validateCardNumber(cardNumber) {
  if (cardNumber.length === 0) {
    return "This field cannot be blank";
  } else if (!/([0-9]{4}\s?){4}/.test(cardNumber)) {
    return "Invalid credit card number";
  } else {
    return "";
  }
}

function validateYear(YY) {
  if (YY.length === 0) {
    return "This field cannot be blank";
  } else if (!/^[0-9][0-9]$/.test(YY)) {
    return "Invalid year format";
  } else {
    return "";
  }
}

function validateMonth(MM) {
  if (MM.length === 0) {
    return "This field cannot be blank";
  } else if (!/^0[0-9]|1[0-2]$/.test(MM)) {
    return "Invalid month format";
  } else {
    return "";
  }
}

function validateCVC(CVC) {
  if (CVC.length === 0) {
    return "This field cannot be blank";
  } else if (!/^[0-9][0-9][0-9]$/.test(CVC)) {
    return "Invalid CVC format";
  } else {
    return "";
  }
}

function validateForm(event) {
  const $submittedStatus = document.querySelector(".submitted-status");
  const userName = $form.name.value;
  const cardNumber = $form["card-number"].value;
  const YY = $form.YY.value;
  const MM = $form.MM.value;
  const CVC = $form.CVC.value;

  const errorName = validateName(userName);
  const errorCardNumber = validateCardNumber(cardNumber);
  const errorYear = validateYear(YY);
  const errorMonth = validateMonth(MM);
  const errorCVC = validateCVC(CVC);

  const errors = {
    name: errorName,
    "card-number": errorCardNumber,
    YY: errorYear,
    MM: errorMonth,
    CVC: errorCVC,
  };

  const noErrors = manageErrors(errors) === 0;

  if (noErrors) {
    $form.classList.add("occult");
    $submittedStatus.classList.remove("occult");
  }

  event.preventDefault();
}

function manageErrors(errors) {
  const keys = Object.keys(errors);
  let numberOfErrors = 0;
  const $errorTextContainer = document.querySelector("#errorsText");

  keys.forEach(function (key) {
    const error = errors[key];

    if (error) {
      numberOfErrors++;
      $form[key].className = "error";

      const errorText = document.createElement("li");
      errorText.textContent = error;
      $errorTextContainer.appendChild(errorText);
    } else {
      $form[key].className = "";
    }
  });

  return numberOfErrors;
}

$form.onsubmit = validateForm;
