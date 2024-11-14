$(document).ready(function () {

    //첫 화면 애니메이션 효과
    $('.brand_story_left').eq(0).animate({ opacity: 1}, 1000, 'linear')
    $('.brand_story_wrap .brand_story_titlewrap p').each(function (index) {
        $(this).delay(250 * index).animate({ opacity: 1, right: 0 }, 400, 'linear')
    })
    $('.brand_story_wrap .brand_story_txtwrap').delay(400).animate({ opacity: 1 }, 1000, 'linear')

    //스크롤 시 요소 애니메이션 효과


    $(window).on('scroll', function () {

        let scrollHeight = $(window).scrollTop()
        let sectionHeight = $('.brand_story_wrap').height()

        if (scrollHeight >= sectionHeight / 2) {
            $('.brand_story_left').eq(1).animate({ opacity: 1 }, 1000, 'linear')
            $('.brand_slogan_wrap .brand_story_titlewrap p').each(function (index) {
                $(this).delay(250 * index).animate({ opacity: 1, right: 0 }, 400, 'linear')
            })
            $('.brand_slogan_wrap .brand_story_txtwrap').delay(400).animate({ opacity: 1 }, 1000, 'linear')
        }
        if (scrollHeight >= sectionHeight * 1.5) {
            //alert()
            $('.brand_story_video').animate({ opacity: 1, bottom: 0 }, 750, 'linear')
        }
    })
})
