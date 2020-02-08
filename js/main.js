
// 하트아이콘의 부모를 가져오는게 더 효율적입니다.
const heart = document.querySelector('.heart_btn');

heart.addEventListener('click', function () {
    console.log('hit');
    heart.classList.toggle('on');
});