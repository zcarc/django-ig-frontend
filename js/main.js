
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

        let pk = element.getAttribute('name');

        $.ajax({
           type: 'POST',
            url: 'data/like.json',
            data: { pk },
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

        let pk = element.getAttribute('name');

        $.ajax({
            type: 'POST',
            url: 'data/bookmark.json',
            data: { pk },
            dataType: 'json', // response 데이터 타입
            success: function(response) {
                let bookmarkCount = document.querySelector('#bookmark-count-37');
                bookmarkCount.innerHTML = `북마크 ${response.bookmark_count}개`;
            },
            error: function (request, status, error) {
                alert('로그인이 필요합니다.');
                window.location.replace('https://www.naver.com');
            }
        });

    } else if(element.matches('[data-name="comment"]')) {

        let content = document.querySelector('#add-comment-post37 > input[type=text]').value;
        console.log(content);

        if(content.length > 140) {
            alert(`댓글을 최대 140자까지 입력 가능합니다. 현재 글자수: ${content.length}`);
            return;
        }

        $.ajax({
            type: 'POST',
            url: './comment.html',
            data: {
                'pk': 37,
                'content': content,
            },
            dataType: 'html', // response 데이터 타입
            success: function(data) {
                // 태그(element)를 이어서 붙입니다.
                document.querySelector('#comment-list-ajax-post37').insertAdjacentHTML('afterbegin', data);
            },
            error: function (request, status, error) {
                alert('문제가 발생했습니다.');
            }
        });

        document.querySelector('#add-comment-post37 > input[type=text]').value = '';
    } else if(element.matches('[data-name="comment_delete"]')) {

        $.ajax({
            type: 'POST',
            url: 'data/delete.json',
            data: {
                'pk': 37,
            },
            dataType: 'json', // response 데이터 타입
            success: function(response) {

                if(response.status) {
                    let comment = document.querySelector('.comment-detail');
                    comment.remove();
                }
            },
            error: function (request, status, error) {
                alert('문제가 발생했습니다.');
            }
        });

    } else if(element.matches('[data-name="follow"]')) {

        $.ajax({
            type: 'POST',
            url: 'data/follow.json',
            data: {
                'pk': 37,
            },
            dataType: 'json', // response 데이터 타입
            success: function(response) {

                console.log(`response: ${JSON.stringify(response)}`);

                if(response.status) {
                    document.querySelector('input.follow').value = '팔로잉';

                } else {
                    document.querySelector('input.follow').value = '팔로워';
                }
            },
            error: function (request, status, error) {
                alert('문제가 발생했습니다.');
            }
        });
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