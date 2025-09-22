const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Participants']

    try {
        const database = mongodb.getDatabase();
        const lists = await database.db('meetup')
            .collection('participants')
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
    //#swagger.tags=['Participants']
    
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid participant id to find a participant.');
        return;
    }
    
    try {
        const participantId = new ObjectId(req.params.id);
        const database = mongodb.getDatabase();
        const result = await database.db('meetup')
            .collection('participants')
            .find({ _id: participantId })
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(400).json({ message: err.message });
    }
};

const createParticipant = async (req, res) => {
    //#swagger.tags=['Participants']
    const participant = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: req.body.email,
        tshirt_size: req.body.tshirt_size,
        approval_status: req.body.approval_status,
        stake: req.body.stake,
        ward: req.body.ward,
        attended: req.body.attended,
        bishop_email: req.body.bishop_email,
        bishop_name: req.body.bishop_name,
        is_member: req.body.is_member
    };
    const response = await mongodb.getDatabase().db('meetup').collection('participants').insertOne(participant);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the participant.');
    }
};

const updateParticipant = async (req, res) => {
    //#swagger.tags=['Participants']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid participant id to update a participant.');
        return;
    }
    const participantId = new ObjectId(req.params.id);
    const participant = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: req.body.email,
        tshirt_size: req.body.tshirt_size,
        approval_status: req.body.approval_status,
        stake: req.body.stake,
        ward: req.body.ward,
        attended: req.body.attended,
        bishop_email: req.body.bishop_email,
        bishop_name: req.body.bishop_name,
        is_member: req.body.is_member
    };
    const response = await mongodb.getDatabase().db('meetup').collection('participants').replaceOne({ _id: participantId }, participant);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the participant.');
    }
};

const deleteParticipant = async (req, res) => {
    //#swagger.tags=['Participants']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid participant id to delete a participant.');
        return;
    }
    const participantId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('meetup').collection('participants').deleteOne({ _id: participantId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the participant.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createParticipant,
    updateParticipant,
    deleteParticipant,
};