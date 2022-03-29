import {Router} from 'express'
import  signup from '../controller/signup';
import login from '../controller/login';
import getuserprofile from '../controller/getuserprofile';
import updateprofile from '../controller/updateprofile';
import deleteprofile from '../controller/deleteprofile';
const router = Router();

router.post("/signup",signup);
router.post("/login", login);
router.post("/getuserprofile", getuserprofile);
router.put("/updateprofile",updateprofile)
router.post("/deleteprofile",deleteprofile)

export = router;