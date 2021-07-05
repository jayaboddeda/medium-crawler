const fetch = require('node-fetch')

const search = async (req,res) =>{
console.log(req.query.tag)
 const response = await fetch(`https://medium.com/_/api/tags/${req.query.tag}/stream?limit=10`)
    .then(res => res.text())
    .then(json => JSON.parse(json.slice(16)));
    let info = []
    let relatedTags = []
    let tags = []

if(response.payload){
for(let i=0;i<response.payload.relatedTags.length;i++){
    relatedTags.push(response.payload.relatedTags[i].name);
}
if(response.payload.references.Post){

const post = Object.keys(response.payload.references.Post)

const user = Object.keys(response.payload.references.User)
for(let i=0;i<post.length;i++){
var image = response.payload.references.Post[post[i]].virtuals.previewImage.imageId
var title = response.payload.references.Post[post[i]].title
var readingtime = Math.round(response.payload.references.Post[post[i]].virtuals.readingTime)
var tagsobject = response.payload.references.Post[post[i]].virtuals.tags

for(let k=0;k<user.length;k++){
    if(user[k] == response.payload.references.Post[post[i]].creatorId)
var author = response.payload.references.User[user[k]].name


    // console.log(author)
}


let tagarr =[]
for(let j=0; j<tagsobject.length;j++){
tagarr.push(tagsobject[j].name)
}
tags[i] = tagarr
info[i] = {image,title,readingtime,author,tagarr}
}
}
}
let payload = [{relatedTags,info}]

res.send(payload)

}





module.exports = {
    search
}