
// 하트아이콘의 부모를 가져오는게 더 효율적입니다.
// const heart = document.querySelector('.heart_btn');

const header = document.querySelector('#header');
const sideBox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');

// heart.addEventListener('click', function () {
//     console.log('hit');
//     heart.classList.toggle('on');
// });

function delegationFunc(e) {
    console.log(e.target);

    let element = e.target;

    while(!element.getAttribute('data-name')) { // null
        element = element.parentNode;
        console.log('element.parentNode: ', element);

        if(element.nodeName === 'BODY') {
            console.log('element.nodeName: ', element.nodeName);
            element = null;
            return;
        }
    }

    if(element.matches('[data-name="heartbeat"]')) {
        console.log('하트!');

        $.ajax({
           type: 'POST',
            url: 'data/like.json',
            data: 37,
            dataType: 'json', // response 데이터 타입
            success: function(response) {
               let likeCount = document.querySelector('#like-count-37');
               likeCount.innerHTML = `좋아요 ${response.like_count}개`;
            },
            error: function (request, status, error) {
                alert('로그인이 필요합니다.');
                window.location.replace('https://www.naver.com');
            }
        });

    } else if(element.matches('[data-name="bookmark"]')) {
        console.log('북마크!');

    } else if(element.matches('[data-name="share"]')) {
        console.log('공유!');

    } else if(element.matches('[data-name="more"]')) {
        console.log('더보기!');
    }

    element.classList.toggle('on');

    console.log('END delegationFunc...');
}

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

            if(window.innerWidth > 600) {
                element.removeAttribute('style');
            }
        });
    }

}

function scrollFunc() {
    console.log(pageYOffset);

    if(pageYOffset >= 10) {

        header.classList.add('on');

        // 다른 html 파일에서 main.js를 사용해도 에러가 발생하지 않는다.
        if(sideBox) {
            sideBox.classList.add('on');
        }

        resizeFunc();
    } else {
        header.classList.remove('on');

        if(sideBox) {
            sideBox.classList.remove('on');
            sideBox.removeAttribute('style');
        }

    }
}

setTimeout(function () {
    scrollTo(0, 0);
}, 100);

delegation.addEventListener('click', delegationFunc);
window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);