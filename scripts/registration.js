const registration = {
    USER_INFO: {
        user: localStorage.getItem('user'),
        password: localStorage.getItem('password'),
        login: localStorage.getItem('login')
    },
    f() {
        if (!localStorage.getItem('user') || !localStorage.getItem('password')) {
            localStorage.setItem('login', false);
        }
        if (this.USER_INFO.login === 'true') {
            HELP.elementById('sayHi').textContent += `Привет, ${this.USER_INFO.user}`;
            HELP.elementByClass('registration--box').style.display = 'none';
        } else {
            localStorage.removeItem('tasksArray');
        }
    }
};
registration.f();
let userNameBlock = HELP.elementByClass('registration--user_name'),
    passwordBlock = HELP.elementByClass('registration--password');
userNameBlock.onclick = () => {
    if (userNameBlock.value === 'Имя пользователя') {
        userNameBlock.value = '';
    }
};
userNameBlock.onblur = () => {
    if (userNameBlock.value === '') {
        userNameBlock.value = 'Имя пользователя';
    }
};
passwordBlock.onclick = (e) => {
    if (passwordBlock.value === 'Пароль') {
        passwordBlock.value = '';
    }
    passwordBlock.type = 'password';
};
passwordBlock.onblur = () => {
    if (passwordBlock.value === '') {
        passwordBlock.value = 'Пароль';
    }
};
HELP.elementById('registrationButton').onclick = () => {
    let userName = (userNameBlock.value && userNameBlock.value.trim().toLowerCase() !== 'имя пользователя') ? userNameBlock.value : 0,
        password = (passwordBlock.value && passwordBlock.value.trim().toLowerCase() !== 'пароль') ? passwordBlock.value : 0;
    if (userName && password) {
        registration.USER_INFO.user = userNameBlock.value;
        registration.USER_INFO.password = passwordBlock.value;
        registration.USER_INFO.login = true;
        localStorage.setItem("user", userNameBlock.value);
        localStorage.setItem("password", passwordBlock.value);
        localStorage.setItem("login", registration.USER_INFO.login);
        HELP.elementById('sayHi').textContent += `Привет, ${registration.USER_INFO.user}!`;
    } else {
        alert('Введите логин и пароль');
    }
    if (registration.USER_INFO.login) {
        HELP.elementByClass('registration--box').style.display = 'none';
    }
    registration.f();
};

let exit = HELP.elementById('exit');

exit.onclick = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.setItem('login', false);
    location.reload();
};