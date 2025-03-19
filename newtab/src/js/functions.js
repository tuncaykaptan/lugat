let selectedOptions = '';
const infoBtn = document.getElementById("infoBtn");
const main = document.querySelector("main");
const wordHtml = document.getElementById("item");
const meanHtml = document.getElementById("mean");
const exampleHtml = document.getElementById("example");
const linkTitleHtml = document.getElementById("link_title");
const linkHtml = document.getElementById("link");
const contentType = document.getElementById("contentType");
const svgPath = document.querySelectorAll(".stroke");
const svgPathC = document.querySelector(".fill");
const isFirsTime = !Boolean((localStorage.length))
let dailyMode = checkDailyMode();
let darkMode = checkDarkMode();

if(localStorage.getItem("selectedOptions") != null){
   selectedOptions = localStorage.getItem("selectedOptions").split(",");
}




function checkVersion(lastVer){ // version check any notify updates
  if(localStorage.getItem("version") != null && localStorage.getItem("version") != lastVer){ 

    notifyUser(`
    Sevgili Lügat Kullanıcısı,
    <br><br>
    Yeni güncellemeye hoş geldin, 2.01 sürümü ile yeni maddeler eklendi, bazı örneklerin çıkmama sorunu düzeltildi ve performans iyileştirmeleri yapıldı.<br><br>
    Tarayıcı deneyimini güzelleştirmeye devam ediyoruz, eklenmesini istediğin bir madde veya özellik varsa lütfen sağ üstteki bilgi kısmından bizimle iletişime geçmekten çekinme.
    <br><br>
    Saygılarımızla,<br>
    <a href="https://instagram.com/tunc.ayy" target="_blank" style="color:white; font-size: 16px">Lügat Ekibi</a>
    `, `Güzel haberler var!`, lastVer)

      // version update is happening in accept button

  }else{
    localStorage.setItem("version", lastVer) // change version if its first time
  }
}


function setColors(){
  const randomColorIndex = Math.floor(Math.random() * pastelColors.length);
  let color = Array();
  if(darkMode){
    color["text"] = pastelColors[randomColorIndex].light
    color["background"] = pastelColors[randomColorIndex].dark
  }else{
    color["text"] = pastelColors[randomColorIndex].dark
    color["background"] = pastelColors[randomColorIndex].light
  }
  
  return color;
}


function isChecked(type){
  if(selectedOptions.includes(type)){
    return "checked";
  }else{
    return "";
  }
}

function checkDailyMode(){
  if(localStorage.getItem("dailymode") != 0){
    return 1;
  }else{
    return 0;
  }
}

function checkDarkMode(){
  if(localStorage.getItem("darkmode") != 0){
    return 1;
  }else{
    return 0;
  }
}


// SAVE SETTINGS BUTTON 
function saveSettingsBtnFunc(){
  let submitSettings = document.getElementById("submitSettings");
  if(submitSettings){
  submitSettings.addEventListener("click", function () {
    const optionElements = document.querySelectorAll(".option");
    const darkModeCheckbox = document.querySelector("#darkModeCheckbox");
    const dailyModeCheckbox = document.querySelector("#dailyModeCheckbox");
    if(darkModeCheckbox.checked){
      localStorage.setItem("darkmode", 1);
    }else{
      localStorage.setItem("darkmode", 0);
    }
    if(dailyModeCheckbox.checked){
      localStorage.setItem("today", Date().split(" ")[2])
      localStorage.setItem("dailymode", 1);

      if(localStorage.getItem("todays_word") == undefined || localStorage.getItem("todays_idiom") == undefined || localStorage.getItem("todays_poem") == undefined || localStorage.getItem("todays_proverb") == undefined){
        pick_todays_word = Math.floor(Math.random() * words.length)
        pick_todays_idiom= Math.floor(Math.random() * idioms.length)
        pick_todays_poem = Math.floor(Math.random() * poems.length)
        pick_todays_proverb = Math.floor(Math.random() * proverbs.length)
      


      localStorage.setItem("todays_word", pick_todays_word)
      localStorage.setItem("todays_idiom", pick_todays_idiom)
      localStorage.setItem("todays_poem", pick_todays_poem)
      localStorage.setItem("todays_proverb", pick_todays_proverb)
    }

    }else{
      localStorage.setItem("dailymode", 0);
      localStorage.removeItem("today")
      localStorage.removeItem("todays_word")
      localStorage.removeItem("todays_poem")
      localStorage.removeItem("todays_idiom")
      localStorage.removeItem("todays_proverb")
    }

    const sOptions = [];

    optionElements.forEach(function (optionElement) {
      const checkbox = optionElement.querySelector("input[type='checkbox']");

      if (checkbox.checked) {
        sOptions.push(checkbox.value);
      }
    });

    // selected settings:
    if(sOptions.length != 0){
      localStorage.setItem("selectedOptions", sOptions);

      selectedOptions = localStorage.getItem("selectedOptions").split(",");

      location.reload();
    }else{
    Notiflix.Notify.failure('En az bir seçim yapmalısınız.');
    }
  });
  }
}
// SAVE SETTINGS BUTTON 

// INFO SCREEN STYLIZATION
function infoScreenStyle() {
  // set colors
  const infoBox = document.querySelector("#infoBox");
  const submitSettings = document.querySelector("#submitSettings");
  const hrTag = document.querySelector(".hr");
  const detailsAtags = document.querySelectorAll(".details a")
  const svgs = document.querySelectorAll(".check svg")

  let color = setColors()

  infoBox.style.backgroundColor = color["background"];
  infoBox.style.color = color["text"];
  submitSettings.style.backgroundColor = color["text"];
  submitSettings.style.color = color["background"];
  hrTag.style.backgroundColor = color["text"];


  svgs.forEach((svg) => {
    svg.style.stroke = color["text"];
  })

  detailsAtags.forEach((detailsAtag) => {
    detailsAtag.style.color = color["text"];
  })



  // custom scroller css
  const style = document.createElement('style');
  document.head.appendChild(style);

  const css = `
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: `+ color["background"] +`;
    }

    ::-webkit-scrollbar {
      width: 10px;
      background-color: `+ color["background"] +`;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: `+ color["text"] +`;
    }
  `;
  style.appendChild(document.createTextNode(css));
  // custom scroller css


  let infoScreenDiv = document.getElementById("infoScreen");
  setTimeout(() => {
    infoScreenDiv.style.opacity = 1;
    infoBox.style.opacity = 1;
  }, 1);
}
// INFO SCREEN STYLIZATION



function infoScreen(text = "Yeni sekmelerinizde hangilerini görmek istersiniz?", header = "Lügat", credits = 1) {
  const checkBoxes = {
    "word": isChecked("word"),
    "proverb": isChecked("proverb"),
    "idiom": isChecked("idiom"),
    "poem": isChecked("poem")
  };

  let dailyModeChecked = "";
  let darkModeChecked = "";

  if(dailyMode){
    dailyModeChecked = "checked";
  }
  if(darkMode){
    darkModeChecked = "checked";
  }

  let infoScreenContent = `<p>` + text + `</p>`;

  for (const key in checkBoxes) {
    if (checkBoxes.hasOwnProperty(key)) {
      switch(key){
        case "word":
          keyStr = "Kelime"
          break;
        case "proverb":
          keyStr = "Atasözü"
          break;
        case "idiom":
          keyStr = "Deyim"
          break;
        case "poem":
          keyStr = "Şiir"
          break;
      }

      infoScreenContent += `
                <div class="option">
                <input type="checkbox" value="` + key + `" id="` + key +`Checkbox" class="cbx" style="display: none;" ` + checkBoxes[key] +` >
                <label for="` + key + `Checkbox" class="check">
                  <svg width="18px" height="18px" viewBox="0 0 18 18">
                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                  </svg>
                  `+ keyStr +`
                </label>
              </div>`;
      
    }
  }

  infoScreenContent += `<br>

  <p> Ayarlar </p>

  <div id="extraOptionDiv">
    <input type="checkbox" value="dailyModeCheckbox" id="dailyModeCheckbox" class="cbx" style="display: none;"  ` + dailyModeChecked + `>
    <label for="dailyModeCheckbox" class="check">
      <svg width="15px" height="15px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
      <info class="dailyMode">24 Saatlik Sabitleme <info class="dailyModeExpl">Bu seçeneği açarsanız içerikler sadece 24 saatte bir değişir.</info> </info>
    </label>
  </div>

  <div id="extraOptionDiv">
    <input type="checkbox" value="darkModeCheckbox" id="darkModeCheckbox" class="cbx" style="display: none;"  ` + darkModeChecked + `>
    <label for="darkModeCheckbox" class="check">
      <svg width="15px" height="15px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
      Koyu Mod
    </label>
  </div>

  <a id="submitSettings">Kaydet</a>
  <div class="hr"></div>`

  if(credits){ // if they want credit section
    infoScreenContent += `

    <a class="profilePhotoLink" href="https://instagram.com/tunc.ayy" target="_blank"><img src="./src/img/profile.png" class="profilePhoto"></a>

    <p class="details">Lügat, Türkçede yeni ifadeler öğrenerek dilimizi daha etkili bir şekilde kullanabilmek amacıyla TDK'nin verileri baz alınarak yapılmıştır.</p>
    <p class="details">Bilgisel kaynaklar: <a href="https://sozluk.gov.tr" target="_blank">TDK</a>, <a href="https://dilbilgisi.net" target="_blank">dilbilgisi.net</a></p>
    <p class="details">Yazılımsal kaynaklar: <a href="https://notiflix.github.io/" target="_blank">Notiflix</a> (Uyarılar için)</p>
    <p class="details">Kelime, atasözü, deyim, kategori veya özellik önermek ya da bir hatayı bildirmek için <a href="https://instagram.com/tunc.ayy" target="_blank">Instagram</a> veya <a href="mailto:tuncayk@protonmail.com" target="_blank" title="tuncayk@protonmail.com">e-posta</a> (tuncayk@protonmail.com) üzerinden iletişime geçebilirsiniz.</p>`
  }
  
  


// if its first time to open extension
main.insertAdjacentHTML("beforeend", `
  <div id="infoScreen" style="opacity: 0"></div>
  <div id="infoBox" style="opacity: 0">
    <h1 style="margin-bottom: 2px;">`+header+`</h1>
    ` + infoScreenContent + `
  </div>`
);


infoScreenStyle();


 if(!isFirsTime){ // if its not first time user can close the menu
  let infoScreenDiv = document.getElementById("infoScreen");

  infoScreenDiv.addEventListener("click", function () {
    infoScreenDiv.style.opacity = 0;
    infoBox.style.opacity = 0;
    setTimeout(() => {
      infoScreenDiv.remove();
      infoBox.remove();
    }, 500);
  });

  }

  saveSettingsBtnFunc();

}


function notifyUser(content, header, lastVer) {
  let notifyScreenContent  = `<p>` + content + `</p>
                              <a id="notificationOkBtn">Harika!</a>
                              <div class="hr"></div>`;

  main.insertAdjacentHTML("beforeend", `
    <div id="infoScreen" style="opacity: 0"></div>
    <div id="infoBox" style="opacity: 0">
      <h1 style="margin-bottom: 2px;">`+header+`</h1>
      ` + notifyScreenContent + `
    </div>`
  );

  // set colors
  const infoBox = document.querySelector("#infoBox");
  const notificationOkBtn = document.querySelector("#notificationOkBtn");
  const hrTag = document.querySelector(".hr");

  let color = setColors()

  infoBox.style.backgroundColor = color["background"];
  infoBox.style.color = color["text"];
  notificationOkBtn.style.backgroundColor = color["text"];
  notificationOkBtn.style.color = color["background"];
  hrTag.style.backgroundColor = color["text"];

  // custom scroller css
  const style = document.createElement('style');
  document.head.appendChild(style);

  const css = `
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: `+ color["background"] +`;
    }

    ::-webkit-scrollbar {
      width: 10px;
      background-color: `+ color["background"] +`;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: `+ color["text"] +`;
    }
  `;
  style.appendChild(document.createTextNode(css));
  // custom scroller css


  let infoScreenDiv = document.getElementById("infoScreen");
  setTimeout(() => {
    infoScreenDiv.style.opacity = 1;
    infoBox.style.opacity = 1;
  }, 1);

  document.getElementById('notificationOkBtn').addEventListener('click', () => {
    localStorage.setItem("version", lastVer) // change version if its updated
    location.reload();
  })

}


function selectCategory(){
  let pickCategory = Math.floor(Math.random() * selectedOptions.length); // pick a random category based on preferences
  return selectedOptions[pickCategory];
}

function getItem(itemId, category){

  if(itemId == 'today'){ // if its turn on the "24 hour" mode
    return localStorage.getItem("todays_"+category);
  }

}

function selectRandomDailyItems() {

  do{
    pick_todays_word = Math.floor(Math.random() * words.length); // not same with yesterday :)
  }while(pick_todays_word == localStorage.getItem("todays_word"))
  localStorage.setItem("todays_word", pick_todays_word)

  do{
    pick_todays_proverb = Math.floor(Math.random() * proverbs.length); // not same with yesterday :)
  }while(pick_todays_proverb == localStorage.getItem("todays_proverb"))
  localStorage.setItem("todays_proverb", pick_todays_proverb)

  do{
    pick_todays_idiom = Math.floor(Math.random() * idioms.length); // not same with yesterday :)
  }while(pick_todays_idiom == localStorage.getItem("todays_idiom"))
  localStorage.setItem("todays_idiom", pick_todays_idiom)

  do{
    pick_todays_poem = Math.floor(Math.random() * poems.length); // not same with yesterday :)
  }while(pick_todays_poem == localStorage.getItem("todays_poem"))
  localStorage.setItem("todays_poem", pick_todays_poem)

  localStorage.setItem("today", Date().split(" ")[2])
}

function writeItem(itemId, category, color){

  // set colors
  document.body.style.backgroundColor = color["background"];
  wordHtml.style.color = color["text"];
  meanHtml.style.color = color["text"];
  exampleHtml.style.color = color["text"];
  contentType.style.color = color["text"];
  svgPathC.style.fill = color["text"];
  svgPath.forEach((svg) => {
  svg.style.stroke = color["text"];
  })


  // set content
  let c;
  
  switch (category){
    case "word":
      c = "kelime";
      category = words;
      break;
    case "proverb":
      c = "atasözü";
      category = proverbs;
      break;
    case "idiom":
      c = "deyim";
      category = idioms;
      break;
    case "poem":
      c = "şiir";
      category = poems;
      break;
  }


  wordHtml.innerHTML = category[itemId].content;
  meanHtml.innerHTML = category[itemId].detail;
  contentType.innerHTML = "("+c+")";

  if(category[itemId].hasOwnProperty("examples")){
    if(category[itemId].examples.length >= 1){
      exampleHtml.style.display = "block";
      category[itemId].examples.forEach(function (example) {
        exampleHtml.innerHTML = '"' + example + '" <br>';  
      })
    }
  }

  if(category[itemId].hasOwnProperty("link")){
    linkHtml.style.display = "block";
    linkHtml.style.background = color["text"]
    linkHtml.style.color = color["background"]
    linkTitleHtml.innerHTML = category[itemId].link["title"] + ' <svg style="padding-top: 5px" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="'+color["background"]+'"><g><path d="M9 .75A.75.75 0 019.75 0h4.5c.206 0 .393.083.529.218l.001.002.002.001A.748.748 0 0115 .75v4.5a.75.75 0 01-1.5 0V2.56L7.28 8.78a.75.75 0 01-1.06-1.06l6.22-6.22H9.75A.75.75 0 019 .75z"/><path d="M3.25 3.5a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0110.75 14h-7.5A2.25 2.25 0 011 11.75v-7.5A2.25 2.25 0 013.25 2h4a.75.75 0 010 1.5h-4z"/></g></svg>'
    linkHtml.href = category[itemId].link["url"]
  }
}

function chooseItem(category){
  switch (category){
    case "word":
      category = words;
      break;
    case "proverb":
      category = proverbs;
      break;
    case "idiom":
      category = idioms;
      break;
    case "poem":
      category = poems;
      break;
  }

  return Math.floor(Math.random() * category.length);
}