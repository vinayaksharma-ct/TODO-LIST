
const commonConfig = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    credentials: "include",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': 'Hello'
    }
}

//HEAD
let headButton = document.getElementById('fetch-btn-head')

headButton.addEventListener('click',(e)=>{
    fetch('https://www.rollingstone.com/wp-content/uploads/2023/11/Travis-Scott-Talks-Astroworld.jpg?crop=0px%2C16px%2C1800px%2C1014px&resize=1600%2C900',
         { ...commonConfig, method:'HEAD', mode: 'no-cors'});
});


// fetch API Methods
//GET
let getButton = document.getElementById('fetch-btn-get');
const renderData = (data) => {
    console.log(data,renderData);
    console.log(data,'renderData');
    let containerEle = document.getElementById('content');
    containerEle.innerHTML = '';
    data.forEach(ele=>{
        let itemEle = document.createElement('div');
        let idEle = document.createElement('h3');
        idEle.innerText = ele.id;
        let titleEle = document.createElement('p');
        titleEle.innerText = ele.title;
        itemEle.appendChild(idEle);
        itemEle.appendChild(titleEle);
        itemEle.id = ele.id;
        itemEle.style.padding = '10px';
        itemEle.style.borderBottom = '1px solid #000';
        containerEle.appendChild(itemEle);
    }); 
}
getButton.addEventListener('click',(e)=>{
    fetch('http://localhost:3000/data',commonConfig)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        renderData(data.data);
    });
});

//POST

let postButton = document.getElementById('fetch-btn-post');

postButton.addEventListener('click',(e)=>{
    if(e) e.preventDefault();
    fetch('http://localhost:3000/create/data',{
        ...commonConfig,
        method: 'POST',
        body: JSON.stringify({
            "userId":12,
            "id":12,
            "title":"test-entry",
            "completed":false
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        renderData(data.data);
    });
});

//PUT

let putButton = document.getElementById('fetch-btn-put');
putButton.addEventListener('click',(e)=>{
    if(e) e.preventDefault();
    fetch('http://localhost:3000/update/data/13',{
        ...commonConfig,
        method: 'PUT',
        body: JSON.stringify({
            "userId":13,
            
            "id":13,
            "title":"Put is working",
            "completed":false
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        renderData(data.data);
    });
});