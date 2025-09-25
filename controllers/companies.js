const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Companies']

    try {
        const database = mongodb.getDatabase();
        const lists = await database.db('meetup')
            .collection('companies')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        console.error('Database error:', err);
        res.status(400).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Companies']
    
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid company id to find a company.');
        return;
    }
    
    try {
        const companyId = new ObjectId(req.params.id);
        const database = mongodb.getDatabase();
        const result = await database.db('meetup')
            .collection('companies')
            .find({ _id: companyId })
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(400).json({ message: err.message });
    }
};

const createCompany = async (req, res) => {
    //#swagger.tags=['Companies']
    try {
        const company = {
            name: req.body.name,
            number: req.body.number,
            war_cry: req.body.war_cry,
            score: req.body.score,
            coins: req.body.coins,
            room: req.body.room
        };
        const response = await mongodb.getDatabase().db('meetup').collection('companies').insertOne(company);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the company.');
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(400).json({ message: err.message });
    }
};

const updateCompany = async (req, res) => {
    //#swagger.tags=['Companies']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid company id to update a company.');
        return;
    }
    try {
        const companyId = new ObjectId(req.params.id);
        const company = {
            name: req.body.name,
            number: req.body.number,
            war_cry: req.body.war_cry,
            score: req.body.score,
            coins: req.body.coins,
            room: req.body.room
        };
        const response = await mongodb.getDatabase().db('meetup').collection('companies').replaceOne({ _id: companyId }, company);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the company.');
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(400).json({ message: err.message });
    }
};

const deleteCompany = async (req, res) => {
    //#swagger.tags=['Companies']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid company id to delete a company.');
        return;
    }
    try {
        const companyId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('meetup').collection('companies').deleteOne({ _id: companyId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the company.');
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCompany,
    updateCompany,
    deleteCompany
};