import passport from "passport";
import local from "passport-local";
import bcrypt from "bcryptjs"; 
import GitHubStrategy from "passport-github2";
import  config  from "../../env.js";
import jwt from "passport-jwt";
import User from "../dao/mongo/models/user.model.js";

const JWTStrategy= jwt.Strategy;
const ExtractJWT=jwt.ExtractJwt;

const LocalStrategy = local.Strategy;


const cookieExtractor=req=>{
    let token=null;
    if( req && req.cookies){
        token= req.cookies['token']
        console.log(token);
    }
    return token
}

const initializePassport =()=>{
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.PRIVATE_KEY,
    }, async(jwt_payload,done)=>{
        try{
            console.log(jwt_payload);
            return done(null,jwt_payload);
        }
        catch(err){
            return done(err)
        }
    }))

    //registro con github
    passport.use('github', new GithubStrategy({
        clientID:  "Iv1.8ca6009f0089a11a",
        clientSecret:'8cd6483b2a7a9ca3b12aba5006436f99719fbb9a',
        callbackURL:`http://localhost:${config.port}/api/sessions/githubcallback`
    }, async (accessToken, refreshToken, profile, done) => {
       
        try {
            let user= await User.findOne ({email: profile._json.email})
            const saltRounds = 10;
            const password=" " 
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            if(!user){
                let newUser= new User({
                    first_name: profile._json.name.split(" ")[0],
                    last_name: profile._json.name.split(" ")[1],
                    email: profile._json.email,
                    password: hashedPassword,
                    age: " ",
                    role:
                      profile._json.email == config.adminName ? "admin" : "usuario",
                })
                await newUser.save()
                return done(null,newUser)
            }
            else{

                return done(null,user)
            }
        }catch(error){
            return done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async (id,done)=>{
        let user = await User.findById(id);
        done (null,user);
    })
}



export default initializePassport