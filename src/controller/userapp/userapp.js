import { Router } from 'express';
import db from '../../services/connectionAsmazirDB' 
const router = Router();
router.use(function authCheck(req, res, next) {
    if (!req.user.email){
      return res.sendStatus(401);
    }
    next();
  });
router.post('/userinfo', async (req, res) => {
    try {
      const data = await db.query('SELECT id,phone,name,email,password FROM users WHERE email="'+req.user.user_id+'"');
      if(data.length>0){
        const user = {
          email: data[0].email,
          phone: data[0].phone,
          name: data[0].name,
        }
        return res.json({type: 'ok', msg: "", user: user});
      }else{
        return res.status(200).send({ type: 'error', msg: 'Қолданушы табылмады',user: {} });
      }
    } catch (err) {
      return res
        .status(200)
        .send({ type: "error", msg: err.message, user_id: {} });
    }
  });

  export default router;