<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Почати навчання</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Arial", sans-serif;
      background: linear-gradient(to bottom right, #f4f2ff, #ffeef2);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      min-height: 100vh;
      color: #2d2d2d;
    }

    h1 {
      margin-top: 40px;
      font-size: 2.5rem;
      color: #2d2d6e;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 30px;
      color: #5a5a89;
    }

    .language-toggle {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .language-toggle button {
      padding: 10px 15px;
      border: none;
      border-radius: 8px;
      background-color: #2d2d6e;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 20px;
      max-width: 800px;
    }

    .card {
      background-color: #ffffffcc;
      border-radius: 20px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
    }

    .icon {
      width: 60px;
      height: 60px;
      margin-bottom: 10px;
    }

    .grade {
      font-size: 1.3rem;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="language-toggle">
    <button onclick="toggleLanguage()" id="langBtn">EN</button>
  </div>
  <h1 id="title">Почати навчання</h1>
  <p id="subtitle">Обери свій клас і вперед до знань!</p>

  <div class="grid" id="grid">
    <div class="card" onclick="goToClass(1)">
      <img src="/icons/backpack.png" alt="1 клас" class="icon" />
      <div class="grade" data-uk="1 клас" data-en="Grade 1">1 клас</div>
    </div>
    <div class="card" onclick="goToClass(2)">
      <img src="/icons/letter.png" alt="2 клас" class="icon" />
      <div class="grade" data-uk="2 клас" data-en="Grade 2">2 клас</div>
    </div>
    <div class="card" onclick="goToClass(3)">
      <img src="/icons/rocket-pencil.png" alt="3 клас" class="icon" />
      <div class="grade" data-uk="3 клас" data-en="Grade 3">3 клас</div>
    </div>
    <div class="card" onclick="goToClass(4)">
      <img src="/icons/globe.png" alt="4 клас" class="icon" />
      <div class="grade" data-uk="4 клас" data-en="Grade 4">4 клас</div>
    </div>
    <div class="card" onclick="goToClass(5)">
      <img src="/icons/cube.png" alt="5 клас" class="icon" />
      <div class="grade" data-uk="5 клас" data-en="Grade 5">5 клас</div>
    </div>
    <div class="card" onclick="goToClass(6)">
      <img src="/icons/microscope.png" alt="6 клас" class="icon" />
      <div class="grade" data-uk="6 клас" data-en="Grade 6">6 клас</div>
    </div>
    <div class="card" onclick="goToClass(7)">
      <img src="/icons/microscope-2.png" alt="7 клас" class="icon" />
      <div class="grade" data-uk="7 клас" data-en="Grade 7">7 клас</div>
    </div>
    <div class="card" onclick="goToClass(8)">
      <img src="/icons/brain-bulb.png" alt="8 клас" class="icon" />
      <div class="grade" data-uk="8 клас" data-en="Grade 8">8 клас</div>
    </div>
    <div class="card" onclick="goToClass(9)">
      <img src="/icons/vr.png" alt="9 клас" class="icon" />
      <div class="grade" data-uk="9 клас" data-en="Grade 9">9 клас</div>
    </div>
  </div>

  <script>
    function goToClass(classNum) {
      if (classNum === 1) {
        window.location.href = "https://focused-lesson-demo.vercel.app/";
      } else {
        window.location.href = `/class/${classNum}`;
      }
    }

    let isUkrainian = true;

    function toggleLanguage() {
      isUkrainian = !isUkrainian;

      document.getElementById("title").innerText = isUkrainian ? "Почати навчання" : "Start Learning";
      document.getElementById("subtitle").innerText = isUkrainian ? "Обери свій клас і вперед до знань!" : "Choose your grade and start learning!";
      document.getElementById("langBtn").innerText = isUkrainian ? "EN" : "UA";

      document.querySelectorAll(".grade").forEach(el => {
        el.innerText = isUkrainian ? el.dataset.uk : el.dataset.en;
      });
    }
  </script>
</body>
</html>
