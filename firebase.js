const firebaseConfig = {
    apiKey: "AIzaSyCce5qxVzEgxE0-vFstb33ZtRsHS-c9T0c",
    authDomain: "poroject-sm.firebaseapp.com",
    databaseURL: "https://poroject-sm-default-rtdb.firebaseio.com",
    projectId: "poroject-sm",
    storageBucket: "poroject-sm.appspot.com",
    messagingSenderId: "26224697760",
    appId: "1:26224697760:web:61f91e2e1d589f7f2544c5",
    measurementId: "G-ZQWZRMTZ3H"
};

// 파이어베이스 앱 초기화
const app = firebase.initializeApp(firebaseConfig);

// 파이어베이스 실시간 데이터베이스 생성
const database = firebase.database();

// 데이터 저장 실습
function writeUserData(userId, email, nick) {
    database.ref("users/"+userId).set({
        email: email,
        nick: nick
    });
}

// 데이터 읽기 실습
// 1. 전체 조회된 결과 출력
//  - 테이블태그 or 목록태그 활용해서 출력
function readUserData(){
    database.ref("users/").on('value',(snapshot)=>{
        // 실시간 데이터베이스 값 접근
        let data = snapshot.val();

        let keys = Object.keys(data);

        const result = document.getElementById("result");
        
        let res = "<ul>";

        for(let i = 0; i < keys.length; i++){
            res += `<li>${data[keys[i]].email} / ${data[keys[i]].nick}</li>`;
        }
        
        res += "</ul>";

        result.innerHTML = res;
    })
}

// 2. 특정 사용자 조회
//  - id값 입력받은 후 해당 사용자의 email,nick 출력
    function readOneUserData(oneId){
        database.ref("users/"+oneId).on('value',(snapshot)=>{
            // 실시간 데이터베이스 값 접근
            let data = snapshot.val();
    
            const resultOne = document.getElementById("resultOne");
            
            resultOne.innerText = `${data.email} / ${data.nick}`
        })
    }

// ================================================================= //

const btn = document.frm.btn;
const readBtn = document.getElementById('readBtn');
const readOneBtn = document.oneFrm.oneBtn;

readBtn.addEventListener('click',() => {
    readUserData();
});

readOneBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const oneId = document.oneFrm.oneId.value;
    readOneUserData(oneId);
})

btn.addEventListener('click', (e) => {
    e.preventDefault()
    const id = document.frm.id.value;
    const email = document.frm.email.value;
    const nick = document.frm.nick.value;

    writeUserData(id, email, nick);
});