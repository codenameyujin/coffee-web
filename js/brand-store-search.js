$(document).ready(function () {
  //매장찾기 페이지

  //매장 서비스 별 검색 리스트 활성화
  $(".findstore_search_service li").each(function () {
    $(this).click(function () {
      $(this).toggleClass("is-selected");
    });
  });
});
