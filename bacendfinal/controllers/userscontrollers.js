
const databasePool = require('../db.js');

function verificaCredenziale(credenziale) {

    if (credenziale.length < 8 || credenziale.length > 20) {//controllo lunghezza
        return false;
    }
    
    let caratteriSpeciali = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;//caratteri speciali
    if (!caratteriSpeciali.test(password)) {//con test verifico la non presenza(1 se è presente) dei char nella variabile
        return false;
    }
    
    if (!(/[A-Z]/.test(password)) || !(/[a-z]/.test(password))){ 
        return false;// verifico se non c'è almeno 1 char MAIUSC o MINUSC
    }
    
    if(!(/[0-9]/.test(password))){
        return false;//verifico se non contiene almeno un numero
    }

    return true;  // Se la password supera tutte le verifiche, ritorna true
}

exports.loginUser = async (req,res) => {

    
    const {email, passwordUser} = req.body;

    //const userName = req.body.userName;//oppure si vede l'email (da vedere con Erika)
    //const password = req.body.password;
    
    try{
        const [users]  = await databasePool.query(
            "SELECT * FROM users WHERE email = ? AND passwordUser = ?",
            [email,passwordUser]
        
        ); 
 
            
        //console.log(users.length);

        if (users.length > 0) {
            return res.status(200).json({
                msg: " Ti sei loggato con successo"
                })
            


        
        } return res.sendStatus(400);
        
    }catch(error){
        console.error(error)
        return res.sendStatus(500)
    }        
    }




//bisogna creare tutti i metodi
// exports.createUser = async(req,res) => {

//     if (verificaPassword(password)) {
//         console.log("La password è valida.");
//     } else {
//         console.log("La password non è valida.");
//     }
    

//     const userName = req.body.first_name.toString();//oppure si vede l'email (da vedere con Erika)
//     const password = req.body.last_name.toString();
//     //const {nome,cognome} = req.body; --> destrutturazione abbreviata
  
//     if(!first_name || !last_name){
//         return res.status(400).json({
//             msg: "per favore, inserisci nome e cognome"
//         })
//     }else if(verificaCredenziale(password) && verificaCredenziale(userName)){
//         return res.status(400).json({
//             msg: "Password e userName non valida"
//         })
//     }

//     try{

//         const [autore] = await databasePool.execute(
//             "INSERT INTO Autore (first_name , last_name) VALUES (?,?)",
//             [first_name,last_name]
//         );

//         const idAutore = autore.insertId;
//         return res.status(200).json({
//             msg: "Autore creato",
//             idAutore ,   
//         });

//     }catch(errore){
//         console.error(errore)
//         res.sendStatus(500);
//     }
// }