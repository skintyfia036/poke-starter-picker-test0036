// ===========================
// 포켓몬 데이터
// img 파일명은 img/ 폴더 안에 넣어주세요
// ===========================
const generations = [
  {
    name: "1세대",
    pokemon: [
      { name: "이상해씨", img: "img/bulbasaur.png" },
      { name: "파이리",   img: "img/charmander.webp" },
      { name: "꼬부기",   img: "img/squirtle.webp" }
    ]
  },
  {
    name: "2세대",
    pokemon: [
      { name: "치코리타", img: "img/chikorita.webp" },
      { name: "브케인",   img: "img/cyndaquil.webp" },
      { name: "리아코",   img: "img/totodile.webp" }
    ]
  },
  {
    name: "3세대",
    pokemon: [
      { name: "나무지기", img: "img/treecko.webp" },
      { name: "아차모",   img: "img/torchic.webp" },
      { name: "물짱이",   img: "img/mudkip.png" }
    ]
  },
  {
    name: "4세대",
    pokemon: [
      { name: "모부기",   img: "img/turtwig.webp" },
      { name: "불꽃숭이", img: "img/chimchar.webp" },
      { name: "팽도리",   img: "img/piplup.png" }
    ]
  },
  {
    name: "5세대",
    pokemon: [
      { name: "주리비얀", img: "img/snivy.webp" },
      { name: "뚜꾸리",   img: "img/tepig.webp" },
      { name: "수댕이",   img: "img/oshawott.png" }
    ]
  },
  {
    name: "6세대",
    pokemon: [
      { name: "도치마론", img: "img/chespin.webp" },
      { name: "푸호꼬",   img: "img/fennekin.webp" },
      { name: "개구마르", img: "img/froakie.webp" }
    ]
  },
  {
    name: "7세대",
    pokemon: [
      { name: "나몰빼미", img: "img/rowlet.webp" },
      { name: "냐오불",   img: "img/litten.webp" },
      { name: "누리공",   img: "img/popplio.png" }
    ]
  },
  {
    name: "8세대",
    pokemon: [
      { name: "흥나숭",   img: "img/grookey.webp" },
      { name: "염버니",   img: "img/scorbunny.webp" },
      { name: "울머기",   img: "img/sobble.webp" }
    ]
  },
  {
    name: "9세대",
    pokemon: [
      { name: "냐오하",   img: "img/sprigatito.webp" },
      { name: "뜨아거",   img: "img/fuecoco.webp" },
      { name: "꾸왁스",   img: "img/quaxly.webp" }
    ]
  }
];

// ===========================
// 상태 변수
// ===========================
let currentGen = 0;
let selected = []; // 세대별 선택 저장 { name, img }

// ===========================
// DOM 요소
// ===========================
const container   = document.getElementById("pokemon-container");
const title       = document.getElementById("gen-title");
const nextBtn     = document.getElementById("next-btn");
const progressFill = document.getElementById("progress-fill");

// ===========================
// 진행 바 업데이트
// ===========================
function updateProgress() {
  const pct = (currentGen / generations.length) * 100;
  progressFill.style.width = pct + "%";
}

// ===========================
// 카드 화면 렌더링
// ===========================
function renderGen() {
  const gen = generations[currentGen];

// 1세대일 때만 이름 입력창 보이기
  const nameWrap = document.getElementById("name-input-wrap");
  nameWrap.style.display = currentGen === 0 ? "block" : "none";

  title.textContent = gen.name;
  container.innerHTML = "";
  nextBtn.style.display = "none";
  updateProgress();

  gen.pokemon.forEach((poke) => {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    // 이미지
    const img = document.createElement("img");
    img.src = poke.img;
    img.alt = poke.name;
    img.onerror = function() {
      // 이미지가 없을 때 빈 자리 유지 (에러 아이콘 제거)
      this.style.opacity = "0.1";
    };

    // 이름
    const nameEl = document.createElement("h2");
    nameEl.textContent = poke.name;

    // 체크 표시
    const check = document.createElement("div");
    check.classList.add("check");
    check.textContent = "✔";

    card.appendChild(img);
    card.appendChild(nameEl);
    card.appendChild(check);

    // 이전에 이미 선택했으면 표시 복원
    if (selected[currentGen] && selected[currentGen].name === poke.name) {
      card.classList.add("selected");
      nextBtn.style.display = "block";
    }

    // 클릭 이벤트
    card.addEventListener("click", () => {
      // 저장
      selected[currentGen] = { name: poke.name, img: poke.img };

      // 다른 카드 선택 해제
      document.querySelectorAll(".pokemon-card")
        .forEach(c => c.classList.remove("selected"));

      // 이 카드 선택 표시
      card.classList.add("selected");

      // 다음 버튼 표시
      nextBtn.style.display = "block";
    });

    container.appendChild(card);
  });
}

// ===========================
// 다음 버튼
// ===========================
nextBtn.addEventListener("click", () => {
  currentGen++;

  if (currentGen >= generations.length) {
    showResult();
    return;
  }

  renderGen();
});

function showResult() {
  const resultScreen = document.getElementById("result-screen"); // ← 이거 추가!
  
  document.getElementById("main-header").style.display = "none";
  container.style.display = "none";
  nextBtn.style.display = "none";

  const trainerName = document.getElementById("trainer-name").value.trim() || "트레이너";

  resultScreen.innerHTML = `
    <h1 class="result-title">${trainerName}의 스타팅 포켓몬</h1>
    <div class="result-grid">
      ${selected.map((pick, i) => `
        <div class="result-card">
          <img src="${pick.img}" alt="${pick.name}" onerror="this.style.opacity='0.1'"/>
          <span class="result-gen">${generations[i].name}</span>
          <span class="result-name">${pick.name}</span>
        </div>
      `).join("")}
    </div>
    <button class="restart-btn" onclick="location.reload()">다시 하기</button>
  `;

  resultScreen.style.display = "flex";
}

// ===========================
// 시작
// ===========================
renderGen();