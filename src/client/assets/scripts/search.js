
const getinfo = async(tag) =>{
    const inputvalue = document.getElementById('tagsearch')
    let relatedtags = document.getElementsByClassName('relatedtags')[0]
    let postpreview = document.getElementsByClassName('postpreview')[0]
    tagvalue = tag || inputvalue.value 
    inputvalue.value = tagvalue
if(postpreview){
    let child = postpreview.lastElementChild; 
    while (child) {
        postpreview.removeChild(child);
        child = postpreview.lastElementChild;
    }
}
if(relatedtags){
    let child = relatedtags.lastElementChild; 
    while (child) {
        relatedtags.removeChild(child);
        child = relatedtags.lastElementChild;
    } 
}
let starttime = new Date().getTime()
    const response = await fetch('/search?tag='+tagvalue)
    response.text().then((info)=>{
        let userinfo = JSON.parse(info)
        console.log(userinfo[0])
       for(let i=0;i<userinfo[0].relatedTags.length;i++){
           let span = document.createElement('span')
           span.setAttribute("onclick",`getinfo('${userinfo[0].relatedTags[i]}')`)
        span.innerHTML = userinfo[0].relatedTags[i]
        relatedtags.appendChild(span)
       }

       for(let i=0;i<userinfo[0].info.length;i++){
           let card = document.createElement('article')
           card.classList.add(`card${i}`)
           card.classList.add('card')
       let endtime = new Date().getTime()

           let info = ` <figure>
           <img src="https://miro.medium.com/max/600/${userinfo[0].info[i].image}" alt="img">
       </figure>
       <figcaption>
           <h2>${userinfo[0].info[i].title}</h2>
           <ul>
               <li>Author : ${userinfo[0].info[i].author}</li>
               <li>Reading Time :  ${userinfo[0].info[i].readingtime} min Read</li>
               <li>Time to crawl : ${endtime - starttime} ms</li>
               <a href="/post?id=${userinfo[0].info[i].postid}"><li>
                   Click to read posts
                  
                   </li> </a>
               <li>
                   Related Tags : 
                   <ul class="posttags${i} posttags relatedtags">
                       
                   </ul>
           </ul>
           </li>
           </ul>
       </figcaption>`
       card.innerHTML=info
       postpreview.appendChild(card)
       const posttags = document.getElementsByClassName('posttags'+i)[0]
    //    console.log(posttags)
       for(let j=0; j<userinfo[0].info[i].tagarr.length;j++){
       const tagli = document.createElement('li')
       tagli.setAttribute("onclick",`getinfo('${userinfo[0].info[i].tagarr[j]}')`)

           var tags = `${userinfo[0].info[i].tagarr[j]}`
           tagli.innerHTML = tags
           posttags.appendChild(tagli)

       }

       }
    

    })
}

