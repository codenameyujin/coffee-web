$(document).ready(function(){
    
    if (window.location.protocol != "https:"){
        window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
    }

    //-- 기능  : 전화번호 형식 변환
    $(document).on("keyup", ".phoneNumber", function() {
        if (!(event.keyCode >=37 && event.keyCode<=40)) { 
            $(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );
        } 
    });
    $(document).on("click", ".linkGo", function() {
        var _$this = $(this);
        var _urlBlank = _$this.attr("data-link");
        var _urlTemp = _$this.attr("data-url");
        if(_urlTemp !=""){
            if (_urlBlank === "_blank") {
                window.open(_urlTemp, '_blank');
            } else {
                // cross-origin
                document.location.href = _urlTemp;
            }    
        }
        
    });
    
    // 쿠키 가져오기
    // getCookie = function (cname) {
    //     var name = cname + "=";
    //     var ca = document.cookie.split(';');
    //     for(var i=0; i<ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0)==' ') c = c.substring(1);
    //         if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    //     }
    //     return "";
    // }

    // 24시간 기준 쿠키 설정하기  
//     setCookie = function (cname, cvalue, exdays) {
//         var todayDate = new Date();
//         todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
//         var expires = "expires=" + todayDate.toUTCString(); // UTC기준의 시간에 exdays인자로 받은 값에 의해서 cookie가 설정 됩니다.
//         document.cookie = cname + "=" + cvalue + "; " + expires;
//     }

//     popupMobileClose = function(popId){
//         setCookie(popId,"Y",1);   //기간( ex. 1은 하루, 7은 일주일)
//         $("#"+popId).removeClass('is-active');
//         $('body,html').removeClass('is-blocked');
//         //console.log("close");
//     }

//     popupPcClose = function(popId){
//         setCookie(popId,"Y",1);   //기간( ex. 1은 하루, 7은 일주일)
//         $("#"+popId).removeClass('l-show');
//     }
// });
function removeNull(xValue){
    if(xValue == "" || xValue == null){
        xValue = "";
    }
    return xValue;
}
/*###############################################################
--page 이동
'###############################################################*/
function goPage(theForm,ActionUrl){
    var formId = "#"+theForm;
    $(formId).prop("action",ActionUrl);
    $(formId).submit();
}
function bComma(str) {
    if(str == "" || str == null){
        return str;
    }else{
        str = String(str);
        if(str == 0){
            return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');    
        }else{
            str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
            str = "<b>"+str+"</b>";
            return str;
        }
    } 
}
function Comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
function unComma(str)
{
    var n ;
    if(str != ""){
        n = parseInt(str.replace(/,/g,"")); 
    }else{
        n = parseInt(0);
    }
    return n;
}
function pageLink(curPage, totalPages, funName) {
    var pageUrl = "";

    var pageLimit = 5;
    var startPage = parseInt((curPage - 1) / pageLimit) * pageLimit + 1;
    var endPage = startPage + pageLimit - 1;

    if (totalPages < endPage) {
        endPage = totalPages;
    }

    var nextPage = endPage + 1;
    //console.log(curPage,"curPage,",startPage,"startPage,",endPage,"endPage,",nextPage,"nextPage")

    //맨 첫 페이지
    if (curPage > 1 && pageLimit < curPage) {
        pageUrl += "<span class=\"pagination_first_end\" onclick=\"javascript:"+funName+"(1);\">1</span>";
        //pageUrl += "<a class='page first' href='javascript:" + funName + "(1);'><i class='fas fa-angle-double-left'></a>";
    }
    //이전 페이지
    if (curPage > pageLimit) {
        pageUrl += "<span class=\"brand_store_pagination_prev\" onclick='javascript:" + funName + "(" + (startPage == 1 ? 1 : startPage - 1) + ");'></span>";
        //pageUrl += " <a class='page prev' href='javascript:" + funName + "(" + (startPage == 1 ? 1 : startPage - 1) + ");'><i class='fas fa-angle-left'></a>";
    }
    //~pageLimit 맞게 페이지 수 보여줌
    pageUrl += "<ul class=\"brand_store_pagelist\">";
    for (var i = startPage; i <= endPage; i++) {
        //현재페이지면 진하게 표시
        if (i == curPage) {
            pageUrl += "<li class=\"is-selected\"><a href=\"#pageTop\">" + i + "</a></li>";
            //pageUrl += " <a href='#'><strong>" + i + "</strong></a>"
        } else {
            pageUrl += "<li><a href='javascript:" + funName + "(" + i + ");'>" + i + "</a></li>";
            //pageUrl += " <a href='javascript:" + funName + "(" + i + ");'> " + i + " </a>";
        }
    }
    pageUrl += "</ul>";
    //다음 페이지
    if (nextPage <= totalPages) {
        pageUrl += "<span class=\"brand_store_pagination_next\" onclick='javascript:" + funName + "(" + (nextPage < totalPages ? nextPage : totalPages) + ");'></span>";
        //pageUrl += "<a class='page next' href='javascript:" + funName + "(" + (nextPage < totalPages ? nextPage : totalPages) + ");'><i class='fas fa-angle-right'></a>";
    }
    //맨 마지막 페이지
    if (curPage < totalPages && nextPage <= totalPages) {
        pageUrl += "<span class=\"pagination_first_end\" onclick='javascript:" + funName + "(" + totalPages + ");'>"+ totalPages +"</span>";
        //pageUrl += "<a class='page last' href='javascript:" + funName + "(" + totalPages + ");'><i class='fas fa-angle-double-right'></a>";
    }
    //console.log(pageUrl);

    return pageUrl;
}
/*
    - num : '-' 문자가 들어있지않은 숫자로된 전화번호
    - type : 0을 보내면 가운데자리를 숨겨준다
    phoneFomatter('01000000000');   //010-0000-0000
    phoneFomatter('01000000000',0); //010-****-0000
*/
function phoneFomatter(num,type){
    var formatNum = '';
    if(num.length==11){
        if(type==0){
            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
        }else{
            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
    }else if(num.length==8){
        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    }else{
        if(num.indexOf('02')==0){
            if(type==0){
                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
            }else{
                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        }else{
            if(type==0){
                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
            }else{
                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
        }
    }
    return formatNum;
}
function SearchGugun(){
    $.ajax({
      type: 'post'
      , async: true
      , url: "/brand/ajaxBrand.asp"
      , data: {"cmd":"getGugun", "city" : $("#city").val()}
      //, data: {"cmd":"getGugun", "city" : "@@version"}
      , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
      , dataType: "json"
      
      , success: function(data) {
          // set data. 
          console.log(data);
          if(typeof(data) != "object") {
            alert('error');
            return;
          }else{
            if(data.result == "Y"){
              var cnt = data.dataList.length;
              //console.log(cnt);
              $("#state").empty();
              $("#state").append("<option value=\"\" selected=\"selected\">구/군 선택</option>");
              for(i=0; i<cnt; i++){
                $("#state").append("<option value='" + data.dataList[i]['town'] + "'> " + data.dataList[i]['town'] + "</option>");
              }
            }else{
              alert(data.msg);
              return;
            }
          }
        }
      , error: function(data, status, err) {
          alert('error');
          return;
        }
      
    });
}
function chkNewFrm(frm_name){
    var el = document.forms[frm_name];

    for (i=0; i<el.elements.length; i++){

        var ele = el.elements[i];
    
        if(ele.type=="radio" && ele.getAttribute("requires")=="yes"){

            chked = false;
            elname = ele.name;
            for (j=0; j<el.elements[elname].length; j++ ) {
                if(el.elements[elname][j].type=="radio" && el.elements[elname][j].checked) {
                    chked = true;
                }
            }
            if(!chked) {
                alert(el.elements[i].getAttribute("message")+" 를 선택하세요.");
                return false;
            }
        }

        if(ele.getAttribute("requires")=="yes" && ele.type=="checkbox"){
            var checkbox_name = ele.getAttribute("name");
            var checked = false;
            for (j=0; j<el.elements.length; j++){
                var ele2 = el.elements[j];
                if(ele2.type=="checkbox" && ele2.getAttribute("name")==checkbox_name && ele2.checked){
                    checked = true;
                }
            }
            if(!checked){
                alert(ele.getAttribute("message")+"(을)를 선택하세요.");
                return false;
            }   
        }

        if(ele.getAttribute("requires")=="yes" && ele.type.indexOf("select")>0){
            if(ele.options[ele.selectedIndex].value == ""){
                alert(ele.getAttribute("message")+" 중 하나를 선택하세요.");
            }
        }


        if(el.elements[i].value == "" && el.elements[i].getAttribute("requires")=="yes"){
            alert(el.elements[i].getAttribute("message")+" 을(를) 입력하세요.");
            el.elements[i].focus();
            return false;
        }
        var byte_allowed = el.elements[i].getAttribute("byte_allowed");
        if(byte_allowed!=null && byte_allowed!=""){
            if(String(el.elements[i].value).strlen() > byte_allowed){
                alert(el.elements[i].getAttribute("message")+" 의 값이 정해진 길이("+byte_allowed+"byte)보다 깁니다.");
                el.elements[i].focus();
                return false;
            }
        }
        var is_digit = el.elements[i].getAttribute("is_digit");
        if(is_digit!=null && is_digit=="yes"){
            if(el.elements[i].value==''){
                continue;
            }
            if(el.elements[i].value != ''+parseFloat(el.elements[i].value)){
                alert(el.elements[i].getAttribute("message")+" 의 값은 숫자여야 합니다.");
                el.elements[i].focus();
                return false;
            }
        }

        var is_notkr = el.elements[i].getAttribute("is_notkr");
        if(is_notkr!=null && is_notkr=="yes"){
            if(el.elements[i].value==''){
                continue;
            }
            if(el.elements[i].value.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/) != -1){
                alert(el.elements[i].getAttribute("message")+" 에는 한글이 들어가면 안됩니다.");
                el.elements[i].focus();
                return false;
            }
        }

        var is_noteng = el.elements[i].getAttribute("is_noteng");
        if(is_noteng!=null && is_noteng=="yes"){
            if(el.elements[i].value==''){
                continue;
            }
            if(el.elements[i].value.search(/[a-z|A-Z]/) != -1){
                alert(el.elements[i].getAttribute("message")+" 에는 영어가 들어가면 안됩니다.");
                el.elements[i].focus();
                return false;
            }
        }
        
        var is_engnum = el.elements[i].getAttribute("is_engnum");
        if(is_engnum!=null && is_engnum=="yes"){
            if(el.elements[i].value==''){
                continue;
            }
            if(el.elements[i].value.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/) != -1){
                alert(el.elements[i].getAttribute("message")+" 에는 한글이 들어가면 안됩니다.");
                el.elements[i].focus();
                return false;
            }
            /*
            if(el.elements[i].value.substring(0,1) == '1' || el.elements[i].value.substring(0,1) == '2' || el.elements[i].value.substring(0,1) == '3' || el.elements[i].value.substring(0,1) == '4' || el.elements[i].value.substring(0,1) == '5' || el.elements[i].value.substring(0,1) == '6' || el.elements[i].value.substring(0,1) == '7' || el.elements[i].value.substring(0,1) == '8' || el.elements[i].value.substring(0,1) == '9' || el.elements[i].value.substring(0,1) == '0'){
                alert(el.elements[i].getAttribute("message")+" 의 첫글자는 영문이어야 합니다.");
                el.elements[i].focus();
                return false;
            }
            */
        }

        var is_num = el.elements[i].getAttribute("is_num");
        if(is_num!=null && is_num=="yes"){
            if(el.elements[i].value==''){
                continue;
            }
            for(var j = 0; j < el.elements[i].value.length; j++) {
                var chr = el.elements[i].value.substr(j, 1);
                if(chr < '0' || chr > '9') {
                    alert(el.elements[i].getAttribute("message")+" 의 값은 숫자여야 합니다.");
                    el.elements[i].value = "";
                    el.elements[i].focus();
                    return false;
                }
            }
        }

        var is_email = el.elements[i].getAttribute("is_email");
        if(el.elements[i].value!='' && is_email=="yes"){
            if(!emailCheck(el.elements[i].value)){
                alert("입력하신 전자우편 주소가 올바르지 않습니다.");
                el.elements[i].value = "";
                el.elements[i].focus();
                return false;
            }
        }

        var is_tint = ele.getAttribute("is_tint");
        if(is_tint == "yes"){
            if(ele.value < 0 || ele.value > 255){
                alert(ele.getAttribute("message")+"의 범위를 다시 입력하세요.(0 ~ 255)");
                ele.focus();
                return false;
            }
        }

    }

    var is_cutstr10 = ele.getAttribute("is_cutstr10");
        if(is_cutstr10 == "yes"){
    if(el.elements[i].value.length > 10){
            funcCountTextLen();
            return false;
        }
    }
    return true;
}
function getMenuKind(kind){
    var dbKindNm;
    if(kind == "Signature"){
        dbKindNm = "Signature";
    }else if(kind == "Coffee"){
        dbKindNm = "Coffee";
    }else if(kind == "Cookies"){
        dbKindNm = "Cookies";
    }else if(kind == "Beverage"){
        dbKindNm = "Beverage";
    }else if(kind == "Deli"){
        dbKindNm = "Deli&Dessert";
    }else if(kind == "MD"){
        dbKindNm = "Deli&MD";
    }else{
        dbKindNm = "NONE";
    }
    return dbKindNm;
}