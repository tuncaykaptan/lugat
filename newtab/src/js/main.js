let itemId;
let lastVer = "2";

checkVersion(lastVer);


// animations
gsap.from(".anim", {
    duration: 0.5,
    y: 30,
    opacity: 0,
    stagger: 0.2,
})
// animations

infoBtn.addEventListener("click", function(){ // settings - info button
    infoScreen()
});


if(isFirsTime){
    infoScreen('Yeni sekmelerinizde hangilerini görmek istersiniz? <br><em style="font-size: 15px">(Bunu daha sonra tekrar değiştirebilirsiniz)</em>', 'Hoş Geldiniz!', 0)

}else{
    let color = setColors();

    const category = selectCategory();



    if(dailyMode){ // "dailymode" is defining in the functions.js page

        today = Date().split(" ")[2];

        if(today != localStorage.getItem("today")){ // if the day is not end yet
            selectRandomDailyItems();
        }

        itemId = getItem("today", category); // key

    }else{

        itemId = chooseItem(category); // key
    }

     writeItem(itemId, category, color)

}