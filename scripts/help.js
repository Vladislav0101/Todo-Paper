const HELP = {
    elementById(el) {
        return document.getElementById(el);
    },
    elementByClass(el) {
        return document.querySelector('.' + el);
    },
    createElementWithClass(element, className) {
        let el = document.createElement(element);
        if (className) {
            el.setAttribute('class', className);
        }
        return el;
    },
    objectToTask(id, text, isActive, date) {
        return {
            id,
            text,
            isActive,
            date
        }
    },
    getMonthName(nmb) {
        switch (nmb) {
            case 0:
                return 'января';
                break;
            case 1:
                return 'февраля';
                break;
            case 2:
                return 'марта';
                break;
            case 3:
                return 'апреля';
                break;
            case 4:
                return 'мая';
                break;
            case 5:
                return 'июня';
                break;
            case 6:
                return 'июля';
                break;
            case 7:
                return 'августа';
                break;
            case 8:
                return 'сентября';
                break;
            case 9:
                return 'октября';
                break;
            case 10:
                return 'ноября';
                break;
            case 11:
                return 'декабря';
                break;
        }
    }
};