const express = require("express");
const router = express.Router();

router.get('/home',(req,res)=>{
    res.render("map",{
        css:["mapa-style.css","mapa-css-pop-up_min.css"],
        js:["mapa-script.js","mapa-script-btn-menu.js"]
    });
});

// router.get('/home_a',(req,res)=>{
//     res.render("map",{
//         css:["style.css","css-info-local.css"],
//         js:["script.js","script-btn-menu.js"]
//     });
// });

module.exports = router