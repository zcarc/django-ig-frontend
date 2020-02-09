
// 하트아이콘의 부모를 가져오는게 더 효율적입니다.
const heart = document.querySelector('.heart_btn');

const header = document.querySelector('#header');
const sideBox = document.querySelector('.side_box');

heart.addEventListener('click', function () {
    console.log('hit');
    heart.classList.toggle('on');
});

function resizeFunc() {
    if(pageYOffset >= 10) {
        // console.log(window.innerWidth);
        // console.log(window.innerWidth * 0.5);

        let calcWidth = (window.innerWidth * 0.5) + 167;
        sideBox.style.left = calcWidth + 'px';
    }
}

function scrollFunc() {
    console.log(pageYOffset);

    if(pageYOffset >= 10) {
        header.classList.add('on');
        sideBox.classList.add('on');
        resizeFunc();
    } else {
        header.classList.remove('on');
        sideBox.classList.remove('on');
        sideBox.removeAttribute('style');
    }
}

window.addEventListener('scroll', scrollFunc);