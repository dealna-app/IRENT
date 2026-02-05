const db = require('../db');

// GET ALL HOUSES
const getHouses = async (req,res) => {
    const [rows] = await db.query('SELECT h.*, c.name AS city, n.name AS neighborhood FROM houses h LEFT JOIN cities c ON h.city_id=c.id LEFT JOIN neighborhoods n ON h.neighborhood_id=n.id WHERE h.status="active"');
    res.json(rows);
}

// GET HOUSE BY ID
const getHouseById = async (req,res) => {
    const id = req.params.id;
    const [rows] = await db.query('SELECT h.*, c.name AS city, n.name AS neighborhood FROM houses h LEFT JOIN cities c ON h.city_id=c.id LEFT JOIN neighborhoods n ON h.neighborhood_id=n.id WHERE h.id=?',[id]);
    if(!rows.length) return res.status(404).json({error:'House not found'});
    res.json(rows[0]);
}

// ADD HOUSE
const addHouse = async (req,res) => {
    const { title, description, type, bedrooms, bathrooms, furnished, price, price_type, city_id, neighborhood_id, address } = req.body;
    const owner_id = req.user.id;
    try {
        const [result] = await db.query(
            'INSERT INTO houses (owner_id,title,description,type,bedrooms,bathrooms,furnished,price,price_type,city_id,neighborhood_id,address,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [owner_id,title,description,type,bedrooms,bathrooms,furnished,price,price_type,city_id,neighborhood_id,address,'pending']
        );
        res.status(201).json({message:'House added, pending approval', house_id:result.insertId});
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports = { getHouses, getHouseById, addHouse };
