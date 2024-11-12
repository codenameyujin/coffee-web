let mouseCursor = document.getElementById("cursor");

document.addEventListener("mousemove", cursor);
function cursor(e) {
  mouseCursor.style.top = e.pageY + document.body.scrollTop + "px";
  mouseCursor.style.left = e.pageX + document.body.scrollLeft + "px";
}
/*
$(document).ready(function(){
    
    $(document).mousemove(function(e){
        var mouseX = e.pageX;
        var mouseY = e.pageY;

        $('#cursor').css({
            left: mouseX + "px",
            top : mouseY + "px"
        })
    })
})
*/