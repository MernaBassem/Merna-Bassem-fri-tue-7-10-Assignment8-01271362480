import jwt from 'jsonwebtoken'



const authenticate = (req,res,next) =>{
    const token = req.headers['token'];

    if(token){
         try{
            if(!token.startswith("bookapp")){
                return res.status(400).json({message:"Invalid Token"});
            }
            const originalToken = token.split(" ")[1];
            const decode = jwt.verify(originalToken, "your_secret_key");
            if(!decode?.authorId){
                return res.status(400).json({message:"Invalid Token Payload"})
            }
            req.authorId = decode.authorId;
            next()

         }catch(error){
            return res.status(400).json({error:error.message})
         }
    }else{
        return res.status(401).json({message:"Access denied"});
    }
}

export default authenticate;