const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => { // 클릭시 로또 번호 추천
    let container = document.querySelector("#container");
    container.innerHTML += `<li>${main()}</li>`;
    init();
});

const delBtn = document.querySelector("#delBtn");
delBtn.addEventListener('click', ()=>{  // 클릭시 로또 번호 초기화
    let container = document.querySelector("#container");
    container.innerHTML = "";
})


let arr = [];
function main(){ 
    while(arr.length < 6){
        addNum();
    }
    bubleSort();
    return arr;
}

function addNum(){ 
    let Item = Math.floor(Math.random() * 100) % 45 + 1; // 숫자 생성
    
    if(!isNum(Item)){ //존재하지않으면 숫자 추가
        arr.push(Item);
    }
}

function isNum(Item){ 
    let isTrue = 0;

    for(let i = 0; i < arr.length; i++){  //배열내에 중복된 숫자가 존재하는지
        if(arr[i] == Item) isTrue = 1 // 존재하면 1
    }

    if(missByWeeks() == 0){ //미출현 번호가 존재하는지
        for(let i=0; i<missNums[0].length; i++){
            if(missNums[0][i] == Item) isTrue = 1;
        }
    }else if(missByWeeks() == 1){
        for(let i=0; i<missNums[1].length; i++){
            if(missNums[1][i] == Item) isTrue = 1;
        }
    }else if(missByWeeks() == 2){
        for(let i=0; i<missNums[2].length; i++){
            if(missNums[2][i] == Item) isTrue = 1;
        }
    }
    return isTrue; // 존재하지않으면 0
}

function bubleSort(){ //오름차순 정렬
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

function init(){ // 배열 초기화
    for(let i=0; i < 6; i++){ 
        arr.pop();
    }
}

function missByWeeks(){ //미출현 주간 확인
    const AllMissNum = document.querySelectorAll('input[name="missNum"]');
    for (let input of AllMissNum) {
        if (input.checked) {
            if (input.id === "missNum5") return 0;
            if (input.id === "missNum10") return 1;
            if (input.id === "missNum15") return 2;
        }
    }
}

const missNums = [
    [3, 6, 9, 10, 11, 13, 17, 18, 19, 22, 23, 27, 34, 35, 36, 37, 42, 44], //최근 5주간 미출현 번호
    [18, 22, 35, 42, 44], //최근 10주간 미출현 번호
    [18, 44] //최근 10주간 미출현 번호
];

const numAllSum = [
    [75, 158, 207, 110, 149, 148, 125, 102, 164, 89, //2025
    129, 167, 87, 150, 90, 134, 146, 122, 119, 126,
    154, 145, 136, 103, 113, 95, 125, 109, 166, 56, 
    158, 148, 154, 176, 160, 152, 160, 122, 145, 134,
    158, 144, 180, 95, 220, 147, 130, 112], [201, 85, //2024
    154, 131, 75, 132, 136, 158, 94, 134, 146, 112,
    137, 139, 132, 118, 213, 93, 75, 138, 135, 88,
    135, 105, 91, 147, 106, 162, 125, 146, 129, 175, 
    157, 100, 114, 115, 134, 144, 148, 141, 184, 167,
    104, 127, 172, 162, 124, 172, 132, 166, 150, 132],
    [176, 172, 157, 193, 114, 153, 116, 157, 148, 131, //2023
    166, 175, 167, 144, 150, 150, 128, 137, 99, 182, 111,
    163, 136, 115, 142, 125, 172, 123, 152, 152, 100,
    116, 110, 124, 120, 105, 140, 93, 116, 209, 172,
    153, 138, 161, 152, 170, 92, 163, 186, 148, 177,
    165, 99], [ 127, 181, 148, 116, 139, 99, 134, 68, //2022
    146, 105, 155, 113, 140, 175, 200, 128, 116, 138, 142,
    192, 108, 150, 139, 186, 178, 99, 180, 134, 121,
    131, 185, 166, 100, 104, 119, 172, 161, 193, 104,
    125, 73, 155, 109, 127], [124, 98, 120, 180, 164, //2021
    130, 145, 137, 111, 144, 169, 144, 171, 110, 229,
    114, 115, 131, 101, 127, 87, 113, 199, 125, 90,
    121, 136, 96, 135, 147, 133, 183, 136, 155, 166,
    151, 135, 109, 154, 128, 124, 135, 144, 136, 157,
    112, 190, 171, 110, 150, 134]
];