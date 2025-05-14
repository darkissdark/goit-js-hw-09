const formData = { email: '', message: '' };
const form = document.querySelector('.feedback-form');

onPageLoad();

function onPageLoad() {
  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    for (const key in parsedData) {
      if (form.elements[key]) {
        form.elements[key].value = parsedData[key];
        formData[key] = parsedData[key];
      }
    }
  }
}

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = formData;
  if (!email || !message) {
    alert('Please fill all fields');
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
