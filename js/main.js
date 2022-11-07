const elForm=document.querySelector(".hero-box__form");
const elFormInput=document.querySelector(".hero-box__form-input")
const elSiteTitle=document.querySelector(".site-title__region")

const elResultList=document.querySelector(".hero-box__result-list")



const elDataSortBtn=document.querySelector(".hero-box__sort-by")

let inputValue



let toDayDate= new Date()
toDayDate=toDayDate.toString().slice(8, 10);


function makeli(obj) {
    elResultList.innerHTML=""
    elSiteTitle.textContent=obj.region
    elResultList.innerHTML+=
    `

    <li class="list__item-pr">
    <div class="list__item">
        <p class="item__title">
        Bomdod
        </p>
        <p class="list__time">
            ${obj.times.tong_saharlik}
        </p>                   
    </div>
    <div class="list__item">
        <p class="item__title">
            Quyosh
         </p>
         <p class="list__time">
             ${obj.times.quyosh}
         </p>                   
    </div>
    <div class="list__item">
        <p class="item__title">
            Peshin
        </p>        
        <p class="list__time">
            ${obj.times.peshin}
        </p>                   
    </div>
    <div class="list__item">
        <p class="item__title">
            Asr
        </p> 
        <p class="list__time">
            ${obj.times.asr}
        </p>                   
    </div>
    <div class="list__item">
        <p class="item__title">
            Shom
        </p> 
        <p class="list__time">
            ${obj.times.shom_iftor}
        </p>                    
    </div>
    <div class="list__item">
        <p class="item__title">
            Xufton  
        </p> 
        <p class="list__time">
            ${obj.times.hufton}
        </p>                    
    </div>
    </li>
    <li class="list__item-date-box">
        <p class="list__item-date">
            ${obj.date}
        </p>
     </li>
    `    
}
function getWeekTime(elm) {
    elResultList.innerHTML=""
    elm.forEach(obj => {
        elSiteTitle.textContent=obj.region
        elResultList.innerHTML+=
        `
        <li class="list__item-pr">
        <div class="list__item">
            <p class="item__title">
            Bomdod
            </p>
            <p class="list__time">
                ${obj.times.tong_saharlik}
            </p>                   
        </div>
        <div class="list__item">
            <p class="item__title">
                Quyosh
             </p>
             <p class="list__time">
                 ${obj.times.quyosh}
             </p>                   
        </div>
        <div class="list__item">
            <p class="item__title">
                Peshin
            </p>        
            <p class="list__time">
                ${obj.times.peshin}
            </p>                   
        </div>
        <div class="list__item">
            <p class="item__title">
                Asr
            </p> 
            <p class="list__time">
                ${obj.times.asr}
            </p>                   
        </div>
        <div class="list__item">
            <p class="item__title">
                Shom
            </p> 
            <p class="list__time">
                ${obj.times.shom_iftor}
            </p>                    
        </div>
        <div class="list__item">
            <p class="item__title">
                Xufton  
            </p> 
            <p class="list__time">
                ${obj.times.hufton}
            </p>                    
        </div>
        </li>
        <li class="list__item-date-box">
            <p class="list__item-date">
                ${obj.date.slice(0, 10)}
            </p>
        </li>
        `    
    });

}


async function weekGetTime(reg,dataDay,month="present/") {
    try {
       const res = await fetch(`https://islomapi.uz/api/${month}${dataDay || "day"}?region=${reg || "Toshkent"}&month=${toDayDate}`)
        const data=await res.json()
        getWeekTime(data)
    } catch (error) {
        console.log(error);
    }
}




async function getTimeNomoz(reg) {
    try {
       const res = await fetch(`https://islomapi.uz/api/present/day?region=${reg || "Toshkent"}&month=${toDayDate}`)
        const data=await res.json()
        makeli(data)
    } catch (error) {
        alert("Hududingizni nato'g'ri kiritingiz!")
        console.log(error);
    }
}


function deb(cb, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(cb, delay)
    }
}

function tes() {
    inputValue = elFormInput.value
    getTimeNomoz(inputValue)
}

elForm.addEventListener("keyup", deb(tes, 1500))


elDataSortBtn.addEventListener("click",(evt)=>{
    evt.preventDefault()
    if (evt.target.dataset.data=="week") {
        weekGetTime(inputValue, evt.target.dataset.data)
    }else if(evt.target.dataset.data=="day"){
        getTimeNomoz(inputValue)
    }else if (evt.target.dataset.data=="monthly"){
        weekGetTime(inputValue, evt.target.dataset.data,"")
    }
})



getTimeNomoz()


 