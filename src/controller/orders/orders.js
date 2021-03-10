import { Router } from 'express';
import db from '../../services/connectionAsmazirDB'
const { secret } = require('../../config/vars');  
const router = Router();
router.use(function authCheck(req, res, next) {
  if (!req.user.email){
    return res.sendStatus(401);
  }
  next();
});
router.post('/add', async (req, res) => {
  if(!req.body.restoran_id){
    return res
      .status(200)
      .send({ type: "error", msg: 'ресторан белгісіз' });
  }
  if(!req.body.menu){
    return res
      .status(200)
      .send({ type: "error", msg: 'мәзір белгісіз' });
  }
  if(!req.body.date){
    return res
      .status(200)
      .send({ type: "error", msg: 'Күн белгісіз' });
  }
  if(!req.body.table){
    return res
      .status(200)
      .send({ type: "error", msg: 'Стол белгісіз' });
  }
  if(!req.body.count_guest){
    return res
      .status(200)
      .send({ type: "error", msg: 'Адам саны белгісіз' });
  }
  try {
    //order
    let instOrder = await db.query('INSERT INTO `orders` SET '+
    'user_id='+parseInt(req.user.user_id,10)+','+
    'restoran_id="' +req.body.restoran_id+'",'+
    'date="' +req.body.date+'",'+
    '`table`="' +req.body.table+'",'+
    '`total_sum`=0,'+
    'count_guest="' +req.body.count_guest+'"');
    //order food
    let total_sum = 0;
    console.log(req.body.menu);
    let foodList = JSON.parse(req.body.menu);
    foodList.forEach(async element => {
      total_sum += parseInt(element.price,10);
      await db.query('INSERT INTO `order_menu` SET '+
      'order_id='+parseInt(instOrder.insertId,10)+','+
      'food_name="' +element.name+'",'+
      'food_description="' +element.description+'",'+
      '`price`="' +element.price+'"');
    });
    //update order total sum
    await db.query('UPDATE orders SET total_sum="'+total_sum+'" where id=' + instOrder.insertId);

    return res.status(200).send({ type: "ok", msg: 'Тапсырыс қабылданды' });
  } catch (err) {
    return res
      .status(401)
      .send({ type: "error", msg: err.message});
  }
});

router.post('/list', async (req, res) => {
  try {
    const orders = await db.query('SELECT o.id,o.user_id,o.restoran_id,GROUP_CONCAT(f.food_name) as food_name,o.date,o.table,o.count_guest,o.total_sum,r.name as restoran_name FROM orders o LEFT JOIN order_menu f ON o.id = f.order_id LEFT JOIN restorans r ON o.restoran_id = r.restoran_id  WHERE user_id = "'+req.user.user_id+'" GROUP BY o.id');
    return res.status(200).send({ type: "ok", msg: "", orders: orders });
  } catch (err) {
    return res
      .status(401)
      .send({ type: "error", msg: err.message, orders: [] });
  }
  
});

export default router;