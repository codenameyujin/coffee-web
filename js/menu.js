$(function () {

  // 카테고리 버튼 click 이벤트 영역 
  $('.category__btn-list button').click(function () {

    //해당 버튼 텍스트,인텍스 번호 변수 
    let category = $(this).text();
    let index = $(this).index();

    // 카테고리 스타일 
    $(this).addClass('is-active').siblings().removeClass('is-active');
    
    // 카테고리 메뉴 상세 텍스트 
    $('.category__item-wrap .category__item').eq(index).removeClass('is-hide').siblings().addClass('is-hide');
    $('.category__title .title').text(category);
    $('.category__title .desc').eq(index).addClass('is-show').siblings().removeClass('is-show');
	
	if(category == "signature" || category=="crogle"){
		$(".category__recomm").removeClass('is-show').addClass('is-hide');
	}else{
		$(".category__recomm").removeClass('is-hide').addClass('is-show');
	}
    // 가운데 큰 이미지 
    $('.category__center-menu .img').eq(index).removeClass('is-hide').siblings().addClass('is-hide');

    // 토핑메뉴 
    $('.category__recomm-item .topping').eq(index).addClass('is-show').siblings().removeClass('is-show');

    //bg관련 애니메이션 함수 
    $('.category .bg-area .bg-item').eq(index).addClass('is-active').siblings().removeClass('is-active');
    $('.category .bg-area .bg-item').eq(index).siblings().css({'z-index':'0'});
    $('.category .bg-area .bg-item').eq(index).css({'z-index':'2'});
    $('.category .bg-area .bg-item').eq(index-1).css({'z-index':'1'});
    $('.category .bg-area .bg-item').eq(index+1).css({'z-index':'0'});
  });

});