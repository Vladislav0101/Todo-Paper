let addButton = HELP.elementByClass('plus');
let myTasksBox = HELP.elementByClass('my_tasks');

let tasksArray = localStorage.getItem('tasksArray') ? JSON.parse(localStorage.getItem('tasksArray')) : [];
addButton.onclick = () => {
    let task = HELP.elementById('addTask').value;
    tasksArray.push(HELP.objectToTask(tasksArray.length + 1, task, true, new Date));
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
    HELP.renderTasks(task, tasksArray[tasksArray.length - 1].date);
}
if (localStorage.getItem('login') === 'true' && localStorage.getItem('tasksArray')) {
    JSON.parse(localStorage.getItem('tasksArray')).forEach(item => {
        HELP.renderTasks(item.text, item.date);
    });
}