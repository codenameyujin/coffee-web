$(document).ready(function () {
	$(document).on("change", "#quickform #city", function() {
		if($(this).val() != ""){
			quickSearchGugun();  
		}else{
			$("#quickform #state").empty();
			$("#quickform #state").append("<option value=\"\" selected=\"selected\">구/군 선택</option>");
		}
	});
	$(".han").keyup(function (event) {
      regexp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
      v = $(this).val();
      if (regexp.test(v)) {
          alert("한글만 입력가능 합니다.");
          $(this).val(v.replace(regexp, ''));
      }
  });
});

function quickSearchGugun(){
    $.ajax({
      type: 'post'
      , async: true
      , url: "/brand/ajaxBrand.asp"
      , data: {"cmd":"getGugun", "city" : $("#quickform #city").val()}
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
              $("#quickform #state").empty();
              $("#quickform #state").append("<option value=\"\" selected=\"selected\">구/군 선택</option>");
              for(i=0; i<cnt; i++){
                $("#quickform #state").append("<option value='" + data.dataList[i]['town'] + "'> " + data.dataList[i]['town'] + "</option>");
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
function quickConsultProc(){
	var siteUrl = $("#quickform #site_url").val();
	var check = chkNewFrm('quickform');
	if(check){
		$.ajax({
			type: 'post',
			async: true,
			url: "/founded/ajaxMain.asp?cmd=quickAct",
			data: $("#quickform").serialize(),
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "json",
			success: function(data) {
			// set data. 
				if(typeof(data) != "object") {
					alert('ajax send error');
					return;
				}else{
					if(data.rtnCode == "Y"){
						//_PL('https://www.selecto.co.kr/founded/quick_ok.asp');
						alert("상담신청이 완료되었습니다.\n입력하신 정보로 빠르게 상담전화 드리도록 하겠습니다.\n문의주셔서 감사합니다.");
						document.location.href="https://www.selecto.co.kr/founded/quick_ok.asp";
						return;
					}else{
						alert(data.rtnMsg);
						return;
					}
				}
			},
			error: function(data, status, err) {
				alert('전송 중 에러 발생!\n관리자에게 문의 바랍니다!');
				return;
			}
		});
	}else{
		return false;
	}
}