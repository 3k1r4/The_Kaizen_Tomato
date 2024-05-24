const [tomato] = await databasePool.query("
UPDATE tomatoes 
SET tomatoes.tomatoType='broken' 
where id = (select max(id) from tomatoes,lifeCircle WHERE tomatoes.lifeCircleId = lifecircle.id) 
AND lifecircle.step=? AND tomatoes.email=? ", 
[step, email]);

const maxid = await databasePool.query(`
    select Max(id) 
    FROM tomatoes
    WHERE email = ?`,
    [email]
);


const [tomato] = await databasePool.query("
    UPDATE tomatoes 
    SET tomatoes.tomatoType='broken' 
    where id = ? AND lifecircle.step=? AND tomatoes.email=? ", 
    [maxid,step, email]
);
--collegamento email
--lifecircle
--