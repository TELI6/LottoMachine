let round = 1;

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => { // 클릭시 로또 번호 추천
    const listContainer = document.querySelector("#lottoList");
    const historyContainer = document.querySelector("#historyList");

    if(!isCorrectRange()) {
        alert("공 6개를 선택해주세요.");
        return;
    }

    let arr = new Array(), ItemList = AddBalls(arr); 

    listContainer.innerHTML = BallItems(ItemList) + listContainer.innerHTML;
    historyContainer.innerHTML = hisItems(ItemList) + historyContainer.innerHTML;
    round++;
});

function BallItems(ItemList){
    return `<li>${round}회차 <ul id="balls">${ItemList}</ul></li>`;
}

function hisItems(ItemList){
    const now = new Date();
    const hisBalls = `<ul id="hisBalls">${ItemList}</ul>`;
    const YMD = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
    const HMS = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
    const time = `<span>${YMD} ${HMS}</span>`;
    return `<li> ${round}회차 ${hisBalls} ${time}</li>`;
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

function AddBalls(arr){
    do{
        init(arr);
        while(arr.length < 6){
            addNum(arr);
        }
    }while(!CreationConditions(arr, 70, 150));

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

function addNum(arr){ 
    let Item = Math.floor(Math.random() * 100) % 45 + 1; // 숫자 생성
    if(NumFilter(arr, Item)){ //존재하지않으면 숫자 추가
        arr.push(Item);
    }
    
}

function NumFilter(arr, Item){
    return Deduplication(arr, Item) && OddEven(arr, Item) && missByWeeks(Item) && SectionDistribution(arr, Item);
}

function Deduplication(arr, Item){ //배열내에 중복된 숫자가 존재하는지
    for(let i = 0; i < arr.length; i++){ 
        if(arr[i] == Item) return 0; // 존재한다면 0
    }
    return 1
}

function OddEven(arr, Item) {
    const checked = document.querySelector("#oddEvenList > button.oddEvenItem.active");
    if(checked == null) return 1;
    const ritio = (checked.textContent).split(":");
    for(let i=0; i<ritio.length; i++){
        ritio[i] = parseInt(ritio[i]);
    }

    let odd = 0, even = 0;
    for(let i = 0; i < arr.length; i++){ 
        if(arr[i] % 2 == 1) odd++;
        else if(arr[i] % 2 == 0) even++;
    }
    if(Item % 2 == 1 && odd+1 <= ritio[0]) return 1; // 홀수
    else if(Item % 2 == 0 && even+1 <= ritio[1]) return 1; //짝수
    else return 0; 
}
function CreationConditions(arr, st, en){
    return isSumInRange(arr, st, en);
}
function isSumInRange(arr, st, en){ //범위 몇부터 몇까지
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum += arr[i];
    }
    return (sum >= st && sum <= en);
}

const missNums = [
    [3, 6, 9, 10, 11, 13, 17, 18, 19, 22, 23, 27, 34, 35, 36, 37, 42, 44], //최근 5주간 미출현 번호
    [18, 22, 35, 42, 44], //최근 10주간 미출현 번호
    [18, 44] //최근 15주간 미출현 번호
];

function missByWeeks(Item){ //미출현 주간 확인
    const checked = document.querySelector("#weekList > button.weekItem.active");
    if(checked == null) return 1;
    const optionText = checked.textContent;
    
    let idx;
    if(optionText == "5주") idx = 0;
    else if(optionText == "10주") idx = 1;
    else if(optionText == "15주") idx = 2;

    for(let i=0; i<missNums[idx].length; i++){ // 옵션 주간 중에 미출현 번호가 존재하는지
        if(missNums[idx][i] == Item) return 0; //존재하면 0
    }
    return 1; //존재하지않으면 1
}

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
    });
});

const oddEvenBtns = document.querySelectorAll(".oddEvenItem");
oddEvenBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        oddEvenBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

function ballStyle(num){
    if(num <= 10) return "yellow";
    else if(num <= 20) return "skyblue";
    else if(num <= 30) return "violet";
    else if(num <= 40) return "gray";
    else return "green"; 
}
function isCorrectRange(){
    const RangeNumAll = document.querySelectorAll("#rangeList > li > input");
    let sum = 0, rs;
    for(let i = 0; i < RangeNumAll.length; i++){
        sum += parseInt(RangeNumAll[i].value);
    }
    if(sum >= 1 && sum < 6) rs = 0;
    else if(sum == 6 || sum == 0) rs = 1;

    return rs; 
}
function SectionDistribution(arr, Item){
    console.log("error");
    const RangeNumAll = document.querySelectorAll("#rangeList > li > input");
    let NumAllValue = new Array(5);
    let sum = 0;
    for(let i = 0; i < RangeNumAll.length; i++){
        NumAllValue[i] = parseInt(RangeNumAll[i].value);
        sum += NumAllValue[i];
    }

    if(sum == 0) return 1;

    let checkNum = [0, 0, 0, 0, 0];
    for(let i=0; i < arr.length; i++){
        if(arr[i] >= 1 && arr[i] <= 10) checkNum[0]++;
        else if(arr[i] >= 11 && arr[i] <= 20) checkNum[1]++;
        else if(arr[i] >= 21 && arr[i] <= 30) checkNum[2]++;
        else if(arr[i] >= 31 && arr[i] <= 40) checkNum[3]++;
        else if(arr[i] >= 41 && arr[i] <= 45) checkNum[4]++;
    }
    
    let idx;
    if(Item >= 1 && Item <= 10) idx = 0;
    else if(Item >= 11 && Item <= 20) idx = 1;
    else if(Item >= 21 && Item <= 30) idx = 2;
    else if(Item >= 31 && Item <= 40) idx = 3;
    else if(Item >= 41 && Item <= 45) idx = 4;
    console.log(NumAllValue, checkNum);
    return (checkNum[idx] + 1) <= NumAllValue[idx];
}
