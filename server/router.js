 var express =require('express');
 const router =express.Router();

 router.get('/',(req,res) => {
     res.send('server running');
 });
 module.exports = router;
