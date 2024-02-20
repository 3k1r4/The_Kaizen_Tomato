const databasePool = require("../db.js");
const { use } = require("../routes/lifecircleroute.js");

exports.getallLifecircle = async (req, res) => {
    try {
        const email = req.body.email;
        const [lifeCircle] = await databasePool.query("Select * From lifeCircle where email=? ORDER BY lifeCircle.step", [email])

        return res.status(200).json(lifeCircle);
    } catch (errore) {
        console.error(errore);
        res.sendStatus(500);
    }
}



exports.getnextstep = async (req, res) => {
    try {
        const email = req.body.email;
        let step = Number(req.body.step) + 1;

        const [lifeCircle] = await databasePool.query("Select * From lifeCircle where email=? and step=?", [email, step])
    
        return res.status(200).json(lifeCircle);
        
    } catch (errore) {
        console.error(errore);
        res.sendStatus(500);
    }
}



exports.createlifecircle = async (req, res) => {
    /*
    async function countstep() {
        const email = req.body.email;
        var [numbero] = await databasePool.query("SELECT COUNT(*) AS numero FROM lifeCircle WHERE email=?",[email]);
        console.log(numbero);
        return [numbero];
    }
    */



    

    const {name, duration, lifeType, email} = req.body;
    
    const [numero] = await databasePool.query("SELECT COUNT(*) AS count FROM lifeCircle WHERE email=?",[email]);
    //var step = await countstep();
    const count = numero[0].count + 1;
    //console.log(step1);



    if (!name || !duration || !lifeType || !email) {
        return res.status(400).json({
            msg: "Inserire tutti i campi specificati"
        })
    } else {
        try {

            const [lifeCircle] = await databasePool.query("INSERT INTO lifeCircle(name,duration,lifeType,email,step) VALUES(?,?,?,?,?)", [name,duration,lifeType,email,count])
            return res.status(200).json({
                msg: "LifeCicle Creato con successo"
            })


        } catch (errore) {
            console.error(errore);
            res.sendStatus(500);
        }




    }
}

exports.deletecicle = async (req, res) => {
    const step = req.body.step;

    if (!step) {
        return res.status(400).json({
            error: 'Non sono stati passati i valori necessari'
        });
    }else{
        try{
        const [lifeCircle] = await databasePool.query("DELETE FROM lifeCircle WHERE step=?", [step]);
        

        


        res.status(200).json({
            msg: 'Ciclo eliminato'
        })
        var initialstep,modstep;
        var [stepnumber] = await databasePool.query("SELECT step FROM lifecircle");
        var numeroprova = stepnumber[0].step;
        console.log(stepnumber);
        console.log(numeroprova);
        
        stepnumber.forEach(async (element) => {
            initialstep = stepnumber[element].step;
            modstep = initialstep;
           if(modstep>step){
            modstep = modstep - 1;
            var [updatestep] = await databasePool.query("UPDATE lifecircle SET step=? WHERE step=?",modstep,initialstep)
           } 
        });



        }catch(errore){
            console.error(errore);
            res.status(500)
        }
    }
        
    
}





