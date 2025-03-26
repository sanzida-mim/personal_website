const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', function () {
        const sectionId = this.getAttribute('onclick').match(/'(.*?)'/)[1];
        const element = document.getElementById(sectionId);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    });
});