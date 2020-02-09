
// 하트아이콘의 부모를 가져오는게 더 효율적입니다.
const heart = document.querySelector('.heart_btn');

const header = document.querySelector('#header');
const sideBox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');

heart.addEventListener('click', function () {
    console.log('hit');
    heart.classList.toggle('on');
});

function resizeFunc() {
    console.log('resize!');

    if(pageYOffset >= 10) {
        // console.log(window.innerWidth);
        // console.log(window.innerWidth * 0.5);

        let calcWidth = (window.innerWidth * 0.5) + 167;
        sideBox.style.left = calcWidth + 'px';
    }

    if(matchMedia('screen and (max-width: 800px)').matches) {

        // 기본값으로 넣어주면 모바일에서 이상하게 나오므로
        // 편차를 PC에서 보는것 보다 -20 정도 주면 괜찮아진다.
       // variableWidth.style.width = window.innerWidth + 'px';

        variableWidth.forEach((element, index) => {
            element.style.width = window.innerWidth - 20 + 'px';
        });

        // for(let i = 0; i < variableWidth.length; i++) {
        //     variableWidth[i].style.width = window.innerWidth - 20 + 'px';
        // }

    } else {
        variableWidth.forEach((element, index) => {
            element.removeAttribute('style');
        });
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

window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);