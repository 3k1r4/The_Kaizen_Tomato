const express = require("express");
const router = express.Router();

const lifecirclecontroller = require('../controllers/lifecirclecontroller.js');



//router.post('/getall',lifecirclecontroller.getallLifecircle);
router.post('/nextstep',lifecirclecontroller.getnextstep);
router.post('/',lifecirclecontroller.createlifecircle);
//router.delete('/',lifecirclecontroller.deletecicle);



module.exports = router;


/*
creazione 
    name varchar(20),
    duration int NOT NULL,
    lifeType varchar(20) NOT NULL,
    email varchar(30) NOT NULL,
    

get di tutto ok
get step successivo ok

modifica:
    name varchar(20),
    duration int NOT NULL,
    lifeType varchar(20) NOT NULL,
    

Save: 

    mi viene passato un array di id i quali sono in ordine di step e io devo associare gli id agli step in ordine
    const [id] = req.body


Delete:
    ti permette di eliminare una tupla lifecyrcle


Ripristina:
    impostazione di fabbrica


*/

