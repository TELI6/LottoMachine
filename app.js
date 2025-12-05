let round = 1;

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => { // 클릭시 로또 번호 추천
    const listContainer = document.querySelector("#lottoList");
    const historyContainer = document.querySelector("#historyList");
    const CheckRatio = BtnCheck(".oddEvenItem"), NonAppearNum = BtnCheck("weekItem");
    let arr = new Array(), ItemList = AddBalls(arr, CheckRatio, NonAppearNum); 

    listContainer.innerHTML = BallItems(ItemList) + listContainer.innerHTML;
    historyContainer.innerHTML = hisItems(ItemList) + historyContainer.innerHTML;
    round++;
    // test();
});

function BallItems(ItemList){
    return `<li>${round}회차 <ul id="balls">${ItemList}</ul></li>`;
}

function hisItems(ItemList){
    const now = new Date();
    const hisBalls = `<ul id="hisBalls">${ItemList}</ul>`;
    const YMD = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
    const HMS = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
    const time = `<span>${YMD} ${HMS}</span>`
    return  `<li> ${round}회차 ${hisBalls} ${time}</li>`
}

function BtnCheck(OptionContainer){
    let RatioInput = false;
    const options = document.querySelectorAll(`${OptionContainer}`);

    if(OptionContainer == '.oddEvenItem'){
        options.forEach((btn)=>{ //최적화 필요!
            if(btn.classList[1] == "active"){
                RatioInput = (btn.textContent).split(":");
            }
        });

        for(let i=0; i<RatioInput.length; i++){
            RatioInput[i] = parseInt(RatioInput[i]);
        }

    }else if(OptionContainer == '.weekItem'){
        options.forEach((btn)=>{ //최적화 필요!
            if(btn.classList[1] == "active"){
                RatioInput = btn.textContent;
            }
        });
        
    }
    return RatioInput;
}

const delBtn1 = document.querySelector("#delBtn1");
delBtn1.addEventListener('click', ()=> {  // 클릭시 로또 번호 초기화
    const container = document.querySelector("#lottoList");
    container.innerHTML = "";
    round = 1;
});

const delBtn2 = document.querySelector("#delBtn2");
delBtn2.addEventListener('click', ()=>{ // 클릭시 기록된 로또 번호 초기화
    const container = document.querySelector("#historyList");
    container.innerHTML = "";
});

function AddBalls(arr, CheckRatio){
    do{
        init(arr);
        while(arr.length < 6){
            addNum(arr, CheckRatio);
        }
    }while(!isSumInRange(arr, 70, 150));

    bubleSort(arr);
    let list = "";
    for(let i=0; i < arr.length; i++){
        list += `<li class="${ballStyle(arr[i])}">${arr[i]}</li>`;
    }
    return list;
}

function init(arr){ // 배열 초기화
    for(let i=0; i < 6; i++){ 
        arr.pop();
    }
}

function addNum(arr, CheckRatio){ 
    let Item = Math.floor(Math.random() * 100) % 45 + 1; // 숫자 생성
    if(NumFilter(arr, Item, CheckRatio)){ //존재하지않으면 숫자 추가
        arr.push(Item);
    }
}

function NumFilter(arr, Item, CheckRatio){
    return Deduplication(arr, Item) && OddEven(arr, Item, CheckRatio) && missByWeeks();
}

function Deduplication(arr, Item){ //배열내에 중복된 숫자가 존재하는지
    for(let i = 0; i < arr.length; i++){ 
        if(arr[i] == Item) return 0; // 존재한다면 0
    }
    return 1
}

function OddEven(arr, Item, CheckRatio) {
    if(!CheckRatio) return 1;
    let odd = 0, even = 0;
    for(let i = 0; i < arr.length; i++){ 
        if(arr[i] % 2 == 1) odd++;
        else if(arr[i] % 2 == 0) even++;
    }
    if(Item % 2 == 1 && odd+1 <= CheckRatio[0]) return 1; // 홀수
    else if(Item % 2 == 0 && even+1 <= CheckRatio[1]) return 1; //짝수
    else return 0; 
}

function isSumInRange(arr, min, max){ //범위 몇부터 몇까지
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum += arr[i];
    }
    return (sum >= min && sum <= max);
}

const missNums = [
    [3, 6, 9, 10, 11, 13, 17, 18, 19, 22, 23, 27, 34, 35, 36, 37, 42, 44], //최근 5주간 미출현 번호
    [18, 22, 35, 42, 44], //최근 10주간 미출현 번호
    [18, 44] //최근 15주간 미출현 번호
];

function missByWeeks(Item){ //미출현 주간 확인
    const MissBtns = document.querySelectorAll('.weekItem');
    let idx = 0;
    for (let input of MissBtns) { //어떤 옵션이 클릭되었는지 확인
        console.log(input);
    }
    for(let i=0; i<missNums[idx].length; i++){ // 옵션 주간 중에 미출현 번호가 존재하는지
        if(missNums[idx][i] == Item) return 0; //존재하면 0
    }
    return 1; //존재하지않으면 1
}

// missByWeeks(1);

function bubleSort(arr){ //오름차순 정렬
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[i] > arr[j]){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

const weekBtns = document.querySelectorAll(".weekItem");
weekBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        weekBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    })
})
const oddEvenBtns = document.querySelectorAll(".oddEvenItem");
oddEvenBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        oddEvenBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    })
})

function ballStyle(num){
    if(num <= 10) return "yellow";
    else if(num <= 20) return "skyblue";
    else if(num <= 30) return "violet";
    else if(num <= 40) return "gray";
    else return "green"; 
}

