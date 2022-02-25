const rectangle = document.querySelector('.rectangle');
let isRed = true;
rectangle.addEventListener("click", () => {
    let color = '';
    isRed ? color = 'yellow' : color = 'red';
    rectangle.style.fill = color;
    isRed = !isRed;
})

const extDonut = document.querySelector('.extDonut');
let isSmall = true;
extDonut.addEventListener("mouseover", () => {
    let r = '';
    isSmall ? r = 70 : r = 60;
    extDonut.setAttribute("r", r);
    isSmall = !isSmall;
})