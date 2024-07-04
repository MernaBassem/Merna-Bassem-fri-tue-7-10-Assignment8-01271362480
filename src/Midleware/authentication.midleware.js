import jwt from 'jsonwebtoken'



const authenticate = (req,res,next) =>{
    const token = req.headers['token'];

    if(token){
         try{
             if (!token.startsWith("book_app")) {
               return res.status(400).json({ message: "Invalid Token" });
             }

      const originalToken = token.split("book_app")[1].trim();
            const decode = jwt.verify(originalToken, "your_secret_key");
            if(!decode?.authorId){
                return res.status(400).json({message:"Invalid Token Payload"})
            }
            req.authorId = decode.authorId;
            next()

         }catch(error){
            if (error.message === "jwt expired") {
              return res.status(400).json({ message: "Expired Token , Please Login" });
            }
            return res.status(400).json({error:error.message})
         }
    }else{
        return res.status(401).json({message:"Access denied"});
    }
}

export default authenticate;