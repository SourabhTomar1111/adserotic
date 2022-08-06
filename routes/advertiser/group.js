const express = require('express')
const router = express.Router();

const {create, findOne} = require('../../models/group.model')

const {isAuthenticated, isAdvertiser} = require('../../middleware/Authentication');

router.get('/group',[isAuthenticated], [isAdvertiser], function(req, res, next){
    res.json({ data: 'Fetched all groups', user_id: req.session.user.id});
});


router.post('/group/create',[isAuthenticated], [isAdvertiser], async function(req, res, next){
    
    let data = {
        name: req.body.name,
        user_id: req.session.user.id,
        status: 1
    };

    const foundData = await findOne(data);
    console.log(foundData);
    if(foundData){
        res.json({status: 200, is_new: false, msg: 'Group created', results: foundData});
    }else{
        const insertData = await create(data);
        console.log(insertData.affectedRows);
        if(insertData){
            res.json({status: 200, is_new: true, msg: 'Group created', results: foundData});
        }else{
            res.json({status: 401, is_new: false, msg: 'Failed to created', results: foundData});
        }
    }
    

    return;

    

    
});

module.exports = router;