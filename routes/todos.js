/** @format */

const { uuid } = require('uuidv4');
var express = require('express');
var router = express.Router();

const { db } = require('../mongo');

router.get('/all-todos', async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.limit) * (Number(req.query.page) - 1);
    const sortField = req.query.sortField;
    const sortOrder = req.query.sortOrder;
    const sortObj = { [sortField]: sortOrder };
    const collection = await db().collection('Todo');
    console.log(limit);
    console.log(skip);
    console.log(sortField);
    console.log(sortOrder);
    console.log(sortObj);

    const sortedTodos = await collection
      .find({})
      .sort(sortObj)
      .limit(limit)
      .skip(skip)
      .toArray();

    res.status(200).json({ success: true, message: sortedTodos });
  } catch (e) {
    console.error('error with sorting', e);
  }
});

router.post('/todo-submit', async (req, res) => {
  try {
    const collection = await db().collection('Todo');
    const sortedPost = await collection.find({}).sort({ id: 1 }).toArray();
    const lastPost = sortedPost[sortedPost.length - 1];
    const title = req.body.title;
    const text = req.body.text;
    const creationDate = req.body.creationDate;
    const author = req.body.lastModified;
    const description = req.body.description;
    const priority = req.body.priority;
    const isComplete = req.body.isComplete ? req.body.isComplete : false;

    const todoPost = {
      title: title,
      description: description,
      priority: priority,
      isComplete: isComplete,
      creationDate: creationDate,
      lastModified: new Date(),
      id: Number(sortedPost.length + 1),
    };
    await collection.insertOne(todoPost);
    res
      .status(200)
      .json({ message: 'Successfully Posted', success: todoPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error posting blog.' + error, success: false });
  }
});
router.delete('/todo-delete', async (req, res) => {
  try {
    const isComplete = req.body.isComplete;
    console.log(isComplete, 'isComplete');
    const Id = req.body.idOfProp;
    const collection = await db().collection('Todo');
    console.log(collection);
    console.log(Id);
    const results = await collection.deleteOne({ id: Id });
    res
      .status(200)
      .json({ message: 'Update Complete', response: results });
  } catch (e) {
    console.error(e, 'error');
  }
});
router.put('/todo-update', async (req, res) => {
  try {
    const isComplete = req.body.isComplete;
    console.log(isComplete, 'isComplete');
    const Id = req.body.idOfProp;
    if (isComplete === true) {
      const collection = await db().collection('Todo');
      console.log(collection);
      console.log(Id);
      const results = await collection.findOne({ id: Id });
      console.log(results);
      const response = await collection.update(
        { id: Id },
        { $set: { isComplete: false } }
      );
      res
        .status(200)
        .json({ message: 'Update Complete', response: response });
    }
    if (isComplete === false) {
      const Id = req.body.idOfProp;
      const collection = await db().collection('Todo');
      console.log(collection);
      console.log(Id);
      const results = await collection.findOne({ id: Id });
      console.log(results);
      const response = await collection.update(
        { id: Id },
        { $set: { isComplete: true } }
      );

      res
        .status(200)
        .json({ message: 'Update Complete', response: response });
    }

    //   // const response = await collection.updateOne(
    //   //   { id: Id },
    //   //   { $set: { isComplete: false } }
    //   // );
    //   // res
    //   //   .status(200)
    //   //   .json({ message: 'Update Complete', response: response });
    // }
  } catch (e) {
    console.error('error with update' + e);
  }
});

module.exports = router;
