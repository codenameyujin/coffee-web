// swiper 스와이퍼
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    formatFractionCurrent: function (number) {
      return ("0" + number).slice(-2);
    },
    formatFractionTotal: function (number) {
      return ("0" + number).slice(-2);
    },
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '"></span>' +
        " / " +
        '<span class="' +
        totalClass +
        '"></span>'
      );
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true
});

// 네 번째 섹션 기부 카운팅 스크롤 이벤트
/*
let timer;

document.addEventListener("scroll", () => {
  let value = this.scrollY;
  let section4offsetTop = document.querySelector(".give-count__wrap").offsetTop;

  if (value >= section4offsetTop) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = true;

        new numberCounter("charity-count", $("#dbCounter").val());
      }, 1);
    }
  }
});

// 네 번째 섹션 기부 카운팅 함수
function numberCounter(target_frame, target_number) {
  this.count = 0;
  this.diff = 0;
  this.target_count = parseInt(target_number);
  this.target_frame = document.getElementById(target_frame);
  this.timer = null;
  this.counter();
}
numberCounter.prototype.counter = function () {
  var self = this;
  this.diff = this.target_count - this.count;

  if (this.diff > 0) {
    self.count += Math.ceil(this.diff / 5);
  }

  this.target_frame.innerHTML = this.count
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (this.count < this.target_count) {
    this.timer = setTimeout(function () {
      self.counter();
    }, 30);
  } else {
    clearTimeout(this.timer);
  }
};
*/
// new numberCounter("charity-count", 221986);

(function(){
  function includeHtml() {
      const includeTarget = document.querySelectorAll('.includeJs');
      includeTarget.forEach(function(el, idx) {
          const targetFile = el.dataset.includeFile;
          if(targetFile){
              let xhttp = new XMLHttpRequest();
          
              xhttp.onreadystatechange = function() {
                  if (this.readyState === XMLHttpRequest.DONE) {
                      this.status === 200 ? (el.innerHTML = this.responseText) : null
                      this.status === 404 ? (el.innerHTML = 'include not found.') : null
                  }
              }
              xhttp.open('GET', targetFile, true);
              xhttp.send();
              return;
          }
      });
  };

  includeHtml();
})();