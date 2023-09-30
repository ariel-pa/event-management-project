const customHeader = (req, res, next) =>{
    try{
        const apiKey =  req.headers.api_key;        
        if(apiKey === "ariel_01"){
            res.status(200)
            res.send({message: "INGRESE"});  
            next();
        }else{
         res.status(403)
         res.send({error: "API KEY NO ES CORRECTO"});   
        }        
    }catch(e){
        res.status(403)
        res.send({error: "ALGO COURRIO EN EL CUSTOM HEADERS"});
    }
    
}

module.exports = {customHeader};