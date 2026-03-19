'use strict';
const container = document.querySelector('#featured .featured-img');
const items = container.querySelectorAll('a');

const nameBox = document.querySelector('.featured-txt-name h3');
const descBox = document.querySelector('.featured-txt-desc span');

items.forEach((item) => {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        const newName = this.dataset.name;
        const newDesc = this.dataset.desc;

        if (newName) nameBox.innerText = newName;
        if (newDesc) descBox.innerText = newDesc;

        items.forEach((el) => el.classList.remove('on'));
        this.classList.add('on');

        container.prepend(this);
    });
});
