import express from 'express';
import { Project } from '../models/Project.js';

export const router = express.Router();

/*
  GET /
  - Most recent entry
  - Table of all entries
  - Create form
*/
router.get('/', async (req, res, next) => {
  function buildSort(sortKey) {
  switch (sortKey) {
    case 'name_asc': return { name: 1 };
    case 'name_desc': return { name: -1 };
    case 'type_asc': return { type: 1, name: 1 };
    case 'oldest': return { createdAt: 1};
    case 'newest': 
    default:
      return { createdAt: -1 };
  }
}
  try {
    const entries = await Project.find().sort({ createdAt: -1 });

    res.render('index', {
      title: 'Service Projects',
      entries,
    });
  } catch (err) {
    next(err);
  }
});

// CREATE
router.post('/create-project', async (req, res, next) => {
  try {
    console.log(req.body);
    const title = (req.body.title || '').trim();
    const email = (req.body.email || '').trim();
    const topic = (req.body.topic || '').trim();
    const type = (req.body.type || '').trim();
    
    const description = (req.body.description || '').trim();
    if (!title || !email || !description || !topic || !type) {
      console.log("here now");
      return res.redirect('/');
    }
    await Project.create({ title, description, email, topic, type });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.get('/project/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    console.log("got here");
    if (!project) {
      res.status(404).send('Project not found');
      return;
    }

    res.render('project', {
      title: project.title,
      email: project.email,
      description: project.description,
      type: project.type,
      topic: project.topic
    });
  } catch (err) {
    next(err);
  }
});
//EDIT
//add update + delete functionality
router.get('/edit', async (req, res, next) => {
  try {
    res.render('edit', {
      title: 'Service Projects',
    });
  } catch (err) {
    next(err);
  }
});

