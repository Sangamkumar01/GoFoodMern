const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        res.send({fooditem:global.food_items,
             foodcategory:global.foodCategory});
        console.log(global.food_items);
    } catch (error) {
        console.log(error.message);
        res.send('Server error');
    }
});

module.exports = router;