// $.get("../data/bigbang.json").done(function (res) {
//   console.log(res);
// });

const main = $("#main");
let fullPage = null;

/* 1번째 방법
const jsonFileList = ["../data/bigbang.json", "../data/classic.json"];
const gnbList = $("#gnb ul li");
gnbList.on("click", function (e) {
  e.preventDefault();
  const idx = $(this).index();
  console.log(idx);
  loadJson(jsonFileList[idx]);
});
*/

// 2번째 html에 data 추가
const gnbList = $("#gnb ul li");
gnbList.on("click", function (e) {
  e.preventDefault();
  const jsonFile = $(this).data("json");
  if ($(this).hasClass("selected")) return;
  $(this).addClass("selected").siblings("li").removeClass("selected");
  loadJson(jsonFile);
});

// 함수선언식 funtion 함수명(){} or const 함수명 funtion (){}
loadJson("../data/bigbang.json");
function loadJson(jsonFile) {
  $.ajax({
    url: jsonFile,
    success: function (res) {
      const clockList = res.clock;
      let output = "";
      //forEach(function(item,idx))
      $.each(clockList, function (idx, item) {
        // console.log(item);
        output += `
      <div class="section" style="background-image:url(${item.bg})">
        <div class="info">
          <p class="category" data-splitting>${item.category}</p>
          <h2 class="title" data-splitting>${item.title}</h2>
          <p class="depth" data-splitting><strong>${item.depth}</strong> mm</p>
          <p class="price" data-splitting>CHF ${item.price}</p>
        </div>
      </div>`;
      });
      main.html(output);
      Splitting();
      charMotion(`.section:nth-child(1) .char`);
      if (fullPage !== null) {
        $.fn.fullpage.destroy("all");
      }
      $("#main").fullpage({
        scrollBar: true,
        onLeave: function (origin, destination, direction) {
          charMotion(`.section:nth-child(${destination.index + 1}) .char`);
        },
      });
      fullPage = $.fn.fullpage;
      console.log(fullPage);
    },
  });
}

function charMotion(char) {
  gsap.from(char, {
    y: -200,
    opacity: 0,
    ease: "bounce",
    duration: 1.5,
    stagger: {
      // each: 0.01,
      // 0.1초마다 떨어짐
      amount: 1,
      // 총 1초동안 떨어짐
      from: "random",
    },
  });
}
