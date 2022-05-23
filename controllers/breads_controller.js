const express = require('express');
const breads = express.Router();
const Bread = require('../models/bread.js');
const Baker = require('../models/baker.js');

// INDEX OF BREADS
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(2).lean()
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
});


// GET seeder data
breads.get('/data/seed', (req, res) => {
  Bread.insertMany([
    {
      name: 'Rye',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'French',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      name: 'Gluten Free',
      hasGluten: false,
      image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'Pumpernickel',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    }
  ])
    .then(createdBreads => {
      res.redirect('/breads')
    })
    .catch(err => {
      res.render('404')
  })
});

// NEW
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
});

// POST new bread
breads.post('/', (req, res) => {
  if (!req.body.image) {
      req.body.image = undefined
    }
  if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
  }
  else{
      req.body.hasGluten = false
  }
  Bread.create(req.body)
      .then(newBread => {
          res.redirect('/breads');
      })
      .catch(err => {
          res.render('404')
      })
});

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.indexArray)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
});

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  Bread.findById(req.params.arrayIndex)
        .populate('baker')
        .then(foundBread => {
            const bakedBy = foundBread.getBakedBy()
            console.log(bakedBy)
            res.render('Show', {
                bread: foundBread,
            })
        })
        .catch(err => {
            console.log(err, "error")
            res.render('404')
        })
});

// DELETE
breads.delete('/:arrayIndex', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.arrayIndex, req.body, {runValidators: true})
    .then(updatedBread => {
      res.redirect(`/breads/${req.params.arrayIndex}`)
        })
        .catch(err => {
            res.render('404')
        })
})

module.exports = breads