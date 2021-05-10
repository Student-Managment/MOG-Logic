const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean();

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/subject', async (req, res) => {
    const todos = await Todo.find().lean();
    res.render('subject', { todos });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.get('/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id).lean();  // ?
    res.render('update', {
        todo: todo,
        isIndex: true
    });
});

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/')
})


router.post('/update/:id', async (req, res) => {
    const updated = {
        title: req.body.title
    };
    try {
        const todo = await Todo.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect('/');
    } catch(e) {
        console.log(e);
    }
})

// router.post('/complete', async (req, res) => {
//     const todo = await Todo.findById(req.body.id).lean();
//
//     todo.completed = !!req.body.completed;
//     await todo.save();
//
//     res.redirect('/')
// })

router.get('/delete/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/');
    } catch(e) {
        console.log(e);
    }
});

module.exports = router