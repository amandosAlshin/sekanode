import { Router } from 'express';
import db from '../../services/connectionAsmazirDB'
import jwt from 'jsonwebtoken';
const { secret } = require('../../config/vars');  
const router = Router();

router.post('/signin', async (req, res) => {
  try {
    const data = await db.query('SELECT id,phone,name,email,password FROM users WHERE email="'+req.body.email+'"');
    if(data.length>0){
      if (req.body.password !=data[0].password) {
        return res.status(200).send({ type: 'error',token: "",user_id: 0, msg: 'Құпия сөз дұрыс емес' });
      }else{
        const token = jwt.sign(
          {
            user_id: parseInt(data[0].id),
            email: data[0].email,
            phone: data[0].phone,
            name: data[0].name,
          },
          secret,
          { expiresIn: '1d' },
        );
        return res.json({type: 'ok', token,  user_id: parseInt(data[0].id), msg: ""});
      }
    }else{
      return res.status(200).send({ type: 'error',token: "", user_id: 0, msg: 'Қолданушы табылмады' });
    }
  } catch (err) {
    return res
      .status(200)
      .send({ type: "error",token: "", user_id: 0, msg: err.message });
  }
});
router.post('/signup', async (req, res) => {
  if(!req.body.email){
    return res
      .status(200)
      .send({ type: "error", user_id: "", msg: 'E-mail толтырылған жоқ',token: "" });
  }
  if(!req.body.password){
    return res
      .status(200)
      .send({ type: "error", user_id: "", msg: 'Құпия сөз толтырылған жоқ',token: "" });
  }
  if(!req.body.name){
    return res
      .status(200)
      .send({ type: "error", user_id: "", msg: 'Есіміңіз толтырылған жоқ',token: "" });
  }
  if(!req.body.phone){
    return res
      .status(200)
      .send({ type: "error", user_id: "", msg: 'Тел. нөміріңіз толтырылған жоқ',token: "" });
  }
  try {
    let instUser = await db.query('INSERT INTO users (email,password,name,phone) values ("'+req.body.email+'","'+req.body.password+'",'+
                    '"'+req.body.name+'","'+req.body.phone+'")');
    
    const token = jwt.sign(
      {
        user_id: instUser.insertId,
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
      },
      secret,
      { expiresIn: '1d' },
    );
    return res.status(200).send({ type: "ok", user_id: instUser.insertId, msg: 'Қолданушы тіркелді' ,token});
  } catch (err) {
    return res
      .status(401)
      .send({ type: "error", user_id: "", msg: err.message, token: "" });
  }
});



export default router;