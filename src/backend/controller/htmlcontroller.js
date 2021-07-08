

function index(req,res){
    res.render('index')
}
function post(req,res){
    res.render('post')
}



module.exports = {
index,
post
}