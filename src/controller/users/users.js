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
        return res.status(200).send({ type: 'error', msg: 'Құпия сөз дұрыс емес' });
      }else{
        const token = jwt.sign(
          {
            user_id: data[0].id,
            email: data[0].email,
            phone: data[0].phone,
            name: data[0].name,
          },
          secret,
          { expiresIn: '1d' },
        );
        return res.json({ token, type: 'ok' });
      }
    }else{
      return res.status(200).send({ type: 'error', msg: 'Қолданушы табылмады' });
    }
  } catch (err) {
    return res
      .status(200)
      .send({ status: false, message: err.message });
  }
});
router.post('/signup', async (req, res) => {
  if(!req.body.email){
    return res
      .status(200)
      .send({ type: "error", msg: 'E-mail толтырылған жоқ' });
  }
  if(!req.body.password){
    return res
      .status(200)
      .send({ type: "error", msg: 'Құпия сөз толтырылған жоқ' });
  }
  if(!req.body.name){
    return res
      .status(200)
      .send({ type: "error", msg: 'Есіміңіз толтырылған жоқ' });
  }
  if(!req.body.phone){
    return res
      .status(200)
      .send({ type: "error", msg: 'Тел. нөміріңіз толтырылған жоқ' });
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
    return res.status(200).send({ type: "ok", msg: 'Қолданушы тіркелді' ,token});
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }
});



export default router;