const clockListUl = $("#main #clockList");
let clockSlider = null;

function loadJson(jsonFile) {
  $.ajax({
    url: jsonFile,
    success: function (res) {
      console.log(res.clock);
      const clockList = res.clock;
      let output = "";
      $.each(clockList, function (idx, item) {
        output += `
      <li class=swiper-slide>
      <div class="info">
      <p class="category" data-splitting>${item.category}</p>
      <h2 class="title" data-splitting>${item.title}</h2>
      <p class="depth" data-splitting><strong>${item.depth}</strong> mm</p>
      <p class="price" data-splitting>CHF ${item.price}</p>
      </div>
      <div class="img">
      <img src="${item.bg}"></img>
      </div>
      </li>
      `;
      });
      clockListUl.html(output);
      if (clockSlider !== null) {
        clockSlider.destroy();
      }
      setTimeout(function () {
        gsap.from("#clockList li", {
          opacity: 0,
          ease: "power3",
          duration: 1,
          stagger: {
            from: "center",
            amount: 1,
          },
        });
      }, 10);
      // 모든 동작 후 setTimeout 실행
      clockSlider = new Swiper("#main", {
        slidesPerView: "auto",
        loop: true,
        // loop 옵션을 쓰면 몇 개의 li들이 더 생성된다.
        effect: "coverflow",
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          slideShadows: false,
          depth: 1000,
          stretch: 0,
        },
        pagination: {
          el: "#main .pagination",
          clickable: true,
        },
        mousewheel: true,
      });
    },
  });
}

loadJson("../data/bigbang.json");

const gnbList = $("#gnb li");
gnbList.on("click", function () {
  const jsonFile = $(this).data("json");
  loadJson(jsonFile);
  if ($(this).hasClass("selected")) return;
  $(this).addClass("selected").siblings("li").removeClass("selected");
  return false;
});
