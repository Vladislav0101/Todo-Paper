let addButton = HELP.elementByClass('plus');
let myTasksBox = HELP.elementByClass('my_tasks');
let addInput = HELP.elementById('addTask');

addButton.onclick = () => {
    let task = HELP.elementById('addTask').value;
    let newTaskObj = HELP.objectToTask(obj.tasksArray.length + 1, task, true, new Date)
    obj.tasksArray.push(newTaskObj);
    localStorage.setItem('tasksArray', JSON.stringify(obj.tasksArray));
    obj.renderTask(newTaskObj);
    addInput.value = 'Новая задача';
};
addInput.onclick = () => {
    if (addInput.value === 'Новая задача') {
        addInput.value = '';
    }
};
addInput.onblur = () => {
    if (addInput.value === '') {
        addInput.value = 'Новая задача';
    }
}
let obj = {
    tasksArray: localStorage.getItem('tasksArray') ? JSON.parse(localStorage.getItem('tasksArray')) : [],
    initMyTasks() {
        document.querySelectorAll('.task').forEach(item => item.remove());
        if (localStorage.getItem('login') === 'true' && localStorage.getItem('tasksArray')) {
            this.tasksArray.forEach(item => {
                this.renderTask(item);
            });
        }
    },
    renderTask(element) {
        let dateInDate = new Date(element.date);

        let taskBox = HELP.createElementWithClass('div', 'task'),
            checkbox = HELP.createElementWithClass('input', 'task_checkbox'),
            text = HELP.createElementWithClass('input', 'task_text'),
            edit = HELP.createElementWithClass('img', 'task_img task--edit_btn'),
            remove = HELP.createElementWithClass('img', 'task_img task--remove_btn'),
            dateElement = HELP.createElementWithClass('p', 'task_date');
        checkbox.setAttribute('type', 'checkbox');
        edit.setAttribute('src', '../assets/pencil.png');
        remove.setAttribute('src', '../assets/delete.png');
        text.setAttribute('disabled', '');
        dateElement.textContent = `${dateInDate.getDate()} ${HELP.getMonthName(dateInDate.getMonth())} ${dateInDate.getFullYear()}`
        text.value = element.text;

        // -----ShowDate-----
        taskBox.onmouseover = () => {
            dateElement.style.right = '-100px';
            dateElement.style.left = 'auto';
            dateElement.style.opacity = '1';
        }
        taskBox.onmouseout = () => {
            dateElement.style.right = 'auto';
            dateElement.style.left = '10px';
            dateElement.style.opacity = '0';
        }

        // -----ShowDate----- \\

        this.editTask(edit, text, element.id);
        this.removeTask(remove, element.id);
        this.completedTask(checkbox, taskBox, edit, remove, dateElement, element.id);

        element.isActive ? HELP.elementByClass('my_tasks').append(taskBox) : HELP.elementByClass('ready_tasks').append(taskBox);
        element.isActive ? taskBox.append(checkbox, text, edit, remove, dateElement) : taskBox.append(checkbox, text);
        !element.isActive ? checkbox.checked = true : 0;
    },
    editTask(button, element, elementId) {
        button.onclick = () => {
            element.removeAttribute('disabled');
            element.focus();
        }
        element.onblur = () => {
            element.setAttribute('disabled', '');
            this.tasksArray.forEach(item => {
                if (item.id === elementId) {
                    item.text = element.value;
                }
            });
            localStorage.setItem('tasksArray', JSON.stringify(this.tasksArray));
        }
    },
    removeTask(button, elementId) {
        button.onclick = () => {
            let result = confirm('Вы действительно хотите удалить задачу?');
            if (result) {
                this.tasksArray.forEach((item, index) => {
                    console.log(index, item.id, elementId);
                    if (item.id === elementId) {
                        this.tasksArray.splice(index, 1);
                    }
                });
                localStorage.setItem('tasksArray', JSON.stringify(this.tasksArray));
                this.initMyTasks();
            }
        }
    },
    completedTask(checkbox, taskBox, edit, remove, dateElement, elementId) {
        let completedTaskBox = document.querySelector('.ready_tasks');
        let myTasksBox = HELP.elementByClass('my_tasks');

        checkbox.onclick = () => {
            taskBox.style.opacity = '0';
            if (checkbox.checked) {
                setTimeout(() => {
                    edit.remove();
                    remove.remove()
                    dateElement.remove();

                    this.tasksArray.forEach(item => {
                        if (item.id === elementId) {
                            item.isActive = false;
                            localStorage.setItem('tasksArray', JSON.stringify(this.tasksArray));
                        }
                    });

                    completedTaskBox.append(taskBox);
                    taskBox.style.opacity = '1';
                }, 300);
            } else {
                setTimeout(() => {
                    taskBox.append(edit);
                    taskBox.append(remove);
                    taskBox.append(dateElement);

                    this.tasksArray.forEach(item => {
                        if (item.id === elementId) {
                            item.isActive = true;
                            localStorage.setItem('tasksArray', JSON.stringify(this.tasksArray));
                        }
                    });

                    HELP.elementByClass('title_blocks1').after(taskBox);
                    taskBox.style.opacity = '1';
                }, 300);
            }
        }
    }
};
obj.initMyTasks();