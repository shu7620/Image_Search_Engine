let input=document.querySelector(".search-box input")
let btn=document.querySelector(".btn button")
let images=document.querySelector(".images")
let load=document.querySelector("#load")



const accessKey="7cUHg0hVGk2EcpCdoqcSt7CELsRwucUtKzLgNaqFoG4"
let page=1;
let keyword=""

//INFO: to download images
function download(imgurl){
    fetch(imgurl).then(res=>res.blob()).then(file=>{
      let a= document.createElement("a")
      a.href=URL.createObjectURL(file)
      a.download=new Date().getTime()
      a.click()
    }).catch(()=>alert("Failed to download"))
}

async function getResponse() {
    
    keyword=input.value
    let url=`https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`
    let response=await fetch(url);
    let data=await response.json();
    let results=data.results
    if(page==1){
        images.innerHTML=""
    }
    load.style.display="block"
    results.map((results)=>{
        let li=document.createElement("li")
        li.classList.add("image")
        let html=`<img src="${results.preview_photos[0].urls.small}" alt="image" class="photo">
                <div class="details">
                    <div class="user">
                        <img src="camera.svg" alt="img" >
                        <span>${results.title}</span>
                    </div>
                    <div class="download" onclick=download('${results.preview_photos[0].urls.small}')>
                        <img src="download.svg" alt="">
                    </div>
                </div>`
                li.innerHTML=html
                images.appendChild(li)
    })
    
}

btn.addEventListener("click",()=>{
    page=1
    getResponse()
})

load.addEventListener("click",()=>{
    page++;
    getResponse()
})

input.addEventListener("keyup",(e)=>{
    page=1
    if(e.key=="Enter"){
        getResponse()
    }
})

