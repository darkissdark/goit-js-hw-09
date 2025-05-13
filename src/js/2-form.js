const formData = { email: '', message: '' };
const form = document.querySelector('.feedback-form');
const submitButton = document.querySelector('button[type="submit"]');

onPageLoad();

function onPageLoad() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    const { email, message } = parsedData;
    form.email.value = email;
    form.message.value = message;
  }
}

form.addEventListener('input', onFormInput);
submitButton.addEventListener('click', onFormSubmit);

function onFormInput(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = formData;
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }
  onSubmitSuccess();
}

function onSubmitSuccess() {
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  for (let key in formData) formData[key] = '';
  form.reset();
}
