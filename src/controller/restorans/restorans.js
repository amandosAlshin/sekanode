import { Router } from 'express';
import db from '../../services/connectionAsmazirDB.js'
const router = Router();
import { getDistance } from 'geolib';

router.post('/list', async (req, res) => {
  try {
    const restoransList = await db.query('SELECT id,place_id,name,rating,lat,lng,formatted_address,`table` FROM restorans;');
    return res.status(200).send({type: "ok", msg: "", restorans: restoransList });
  } catch (err) {
    return res
      .status(401)
      .send({ type: "error", msg: err.message, restorans: [] });
  }
  
});

router.post('/near', async (req, res) => {
  try {
    let restoransList = [];
    restoransList = await db.query('SELECT id,place_id,name,rating,lat,lng,formatted_address,`table`FROM restorans;');
    if(restoransList.length>0){
      let nearRestorans = restoransList.filter((item) => {
        let itemDistance = getDistance(
          {latitude: req.body.lat, longitude: req.body.lng},
          {latitude: item.lat, longitude: item.lng}
        );
        item.distance = itemDistance;
        return itemDistance <= 1500;
      });
      return res.status(200).send({type: "ok", msg: "", restorans: nearRestorans });
    }else{
      return res.status(200).send({type: "ok", msg: "", restorans: restoransList });
    }
    
  } catch (err) {
    return res
      .status(401)
      .send({ type: "error", msg: err.message, restorans: [] });
  }
  
});

router.post('/menu-list', async (req, res) => {
  try {
    const restoranMenuList = await db.query('SELECT id,`name`,description,price,restoran_id,image as imageUrl FROM restoran_menu WHERE restoran_id="'+req.body.place_id+'";');
    return res.status(200).send({type: "ok", msg: "", restoranMenu: restoranMenuList });
  } catch (err) {
    return res
      .status(401)
      .send({ type: "error", msg: err.message, restoranMenu: [] });
  }
  
});

router.post('/orders-list', async (req, res) => {
  try {
    const orders = await db.query('SELECT o.id,o.user_id,o.restoran_id,GROUP_CONCAT(f.food_name) as food_name,r.name as restoran_name, CONCAT(u.name, " ", u.phone) as user,o.date,o.table as count_guest,o.count_guest as table,o.total_sum FROM orders o '+ 
    'LEFT JOIN restorans r ON o.restoran_id = r.place_id '+
    'LEFT JOIN users u ON o.user_id = u.id '+
    'LEFT JOIN order_menu f ON o.id = f.order_id '+
    'WHERE restoran_id = "'+req.body.place_id+'" GROUP BY o.id');
    return res.status(200).send({type:"ok", msg: "", orders: orders });
  } catch (err) {
    return res
      .status(401)
      .send({ type: "error", msg: err.message, orders: [] });
  }
  
});
export default router;