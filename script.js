// ===========================
// 포켓몬 데이터
// img 파일명은 img/ 폴더 안에 넣어주세요
// ===========================
const generations = [
  {
    name: "1세대",
    pokemon: [
      { name: "이상해꽃", imgFinal: "imgFinal/venusaur.webp",    imgBase: "imgBase/bulbasaur.png" },
      { name: "리자몽",   imgFinal: "imgFinal/charizard.webp",   imgBase: "imgBase/charmander.webp" },
      { name: "거북왕",   imgFinal: "imgFinal/blastoise.webp",   imgBase: "imgBase/squirtle.webp" }
    ]
  },
  {
    name: "2세대",
    pokemon: [
      { name: "메가니움", imgFinal: "imgFinal/meg.webp",       imgBase: "imgBase/chikorita.webp" },
      { name: "블레이범",   imgFinal: "imgFinal/typ.webp",     imgBase: "imgBase/cyndaquil.webp" },
      {name: "장크로다일",   imgFinal: "imgFinal/fer.webp",    imgBase: "imgBase/totodile.webp"   }
    ]
  },
  {
    name: "3세대",
    pokemon: [
      { name: "나무킹",   imgFinal: "imgFinal/scep.webp",     imgBase: "imgBase/treecko.webp" },
      { name: "번치코",   imgFinal: "imgFinal/blaz.webp",     imgBase: "imgBase/torchic.webp" },
      { name: "대짱이",   imgFinal: "imgFinal/swam.webp",     imgBase: "imgBase/mudkip.png" }
    ]
  },
  {
    name: "4세대",
    pokemon: [
      { name: "토대부기", imgFinal: "imgFinal/tor.webp",     imgBase: "imgBase/turtwig.webp" },
      { name: "초염몽",   imgFinal:   "imgFinal/inf.webp",   imgBase: "imgBase/chimchar.webp"},
      { name: "엠페르트",   imgFinal:   "imgFinal/emp.webp",   imgBase: "imgBase/piplup.png" }
    ]
  },
  {
    name: "5세대",
    pokemon: [
      { name: "샤로다",   imgFinal: "imgFinal/sha.webp",       imgBase: "imgBase/snivy.webp" },
      { name: "염무왕",   imgFinal: "imgFinal/yum.webp",       imgBase: "imgBase/tepig.webp" },
      { name: "대겸귀",   imgFinal: "imgFinal/dae.webp",      imgBase: "imgBase/oshawott.png" }
    ]
  },
  {
    name: "6세대",
    pokemon: [
      { name: "브리가론",  imgFinal: "imgFinal/bri.webp",   imgBase: "imgBase/chespin.webp" },
      { name: "마폭시",   imgFinal: "imgFinal/maf.webp",  imgBase: "imgBase/fennekin.webp" },
      { name: "개굴닌자", imgFinal: "imgFinal/gae.webp",  imgBase: "imgBase/froakie.webp" }
    ]
  },
  {
    name: "7세대",
    pokemon: [
      { name: "모크나이퍼", imgFinal: "imgFinal/mok.webp", imgBase: "imgBase/rowlet.webp" },
      { name: "어흥염",   imgFinal: "imgFinal/auh.webp", imgBase: "imgBase/litten.webp" },
      { name: "누리레느",   imgFinal: "imgFinal/nuli.webp", imgBase: "imgBase/popplio.png" }
    ]
  },
  {
    name: "8세대",
    pokemon: [
      { name: "고릴타",    imgFinal: "imgFinal/gor.webp",  imgBase: "imgBase/grookey.webp" },
      { name: "에이스번",   imgFinal: "imgFinal/ace.webp", imgBase: "imgBase/scorbunny.webp" },
      { name: "인텔리레온",  imgFinal: "imgFinal/int.webp", imgBase: "imgBase/sobble.webp" }
    ]
  },
  {
    name: "9세대",
    pokemon: [
      { name: "마스카나", imgFinal: "imgFinal/mas.webp",  imgBase: "imgBase/sprigatito.webp" },
      { name: "라우드본", imgFinal: "imgFinal/laud.webp",  imgBase: "imgBase/fuecoco.webp" },
      { name: "웨이니발", imgFinal: "imgFinal/wai.webp",   imgBase: "imgBase/quaxly.webp" }
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

    // 이미지 두 개
const imgFinal = document.createElement("img");
imgFinal.src = poke.imgFinal;
imgFinal.classList.add("img-final");
imgFinal.alt = poke.name;
imgFinal.onerror = function () { this.style.opacity = "0.1"; };

const imgBase = document.createElement("img");
imgBase.src = poke.imgBase;
imgBase.classList.add("img-base");
imgBase.onerror = function () { this.style.opacity = "0.1"; };

const nameEl = document.createElement("h2");
nameEl.textContent = poke.name;

const check = document.createElement("div");
check.classList.add("check");
check.textContent = "✔";

const imgWrap = document.createElement("div");
imgWrap.classList.add("img-wrap");
imgWrap.appendChild(imgBase);   // 왼쪽
imgWrap.appendChild(imgFinal);  // 오른쪽

card.appendChild(imgWrap);   // img 두 개를 wrap으로 묶어서
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
      selected[currentGen] = { name: poke.name, imgFinal: poke.imgFinal };

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
  const resultScreen = document.getElementById("result-screen"); 
  
  document.getElementById("main-header").style.display = "none";
  container.style.display = "none";
  nextBtn.style.display = "none";

  const trainerName = document.getElementById("trainer-name").value.trim() || "트레이너";

  resultScreen.innerHTML = `
    <h1 class="result-title">${trainerName}의 스타팅 포켓몬</h1>
    <div class="result-grid">
      ${selected.map((pick, i) => `
        <div class="result-card">
          <img src="${pick.imgFinal}" alt="${pick.name}" onerror="this.style.opacity='0.1'"/>
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