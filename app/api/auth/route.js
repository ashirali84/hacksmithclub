import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { register } from "@/app/controlers/authControler";
import { login } from "@/app/controlers/authControler";


// export async function GET(req) {
//     return NextResponse.json({message:"welcome to next.js server"})
    
// }


// register route
export async function POST(req) {
    await connectDB();
    try {
        const {searchParams} = new URL(req.url);
        // http://localhost:3000/api/auth?register=true
       if(searchParams.get("register")){
        return register(req);
       }
       // http://localhost:3000/api/auth?login=true
       if(searchParams.get("login")){
        return login(req);
       }

       return NextResponse.json({
        message:"Invalid api endpoint"
       })
        
    } catch (error) {
        return NextResponse.json({
            message:"server error",
            error:error.message
        })
    }
    
}

