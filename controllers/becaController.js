var Beca = require('../models/beca');

module.exports.getBeca = (req,res,next) => {
    Beca.findOne({
        nombre: req.params.nombre
    })
    .then((found) => {
        if(found)
            return res.status(200).json(found);
        else
            return res.status(400).json(null);
    })
}

module.exports.getForUpdate = (req,res,next) => {
    Beca.findOne({
        nombre: req.params.nombre
    })
        .then((beca) => {
            return res.render('updating', {title: 'BecaViewer', beca: beca});
        })
        .catch(err => {
            next(err);
        })
}

module.exports.getAllBecas = (req,res,next) => {
    Beca.find({})
    .then((beca) => {
        return res.render('becas',{title: 'BecaViewer',becas: beca});
//        return res.status(200).json(beca);
    }).catch(err => {
        next(err);
    })
}

module.exports.createBeca = (req,res,next) => {
    Beca.findOne({
        nombre: req.body.nombre
    })
    .then((found) => {
        if(found){
            throw new Error(`Proyecto de becas ${req.body.nombre} ya existente`);
        }else{
            let newBeca = new Beca({
                nombre: req.body.nombre,
                fundacion: req.body.fundacion,
                tipo: req.body.tipo,
                descripcion: req.body.descripcion
            });
            return newBeca.save();
        }
    })
    .then(returned => {
        Beca.find({})
        .then((beca)=> {
            return res.render('becas', {title: 'BecaViewer', becas: beca});
        });
    }).catch(err => {
        next(err);
    })
}

module.exports.updateBeca = (req,res,next) => {
    console.log("hello " + req.body.nombre);
    var update = {
        ...req.body
    };

    Beca.findOneAndUpdate({
        nombre: req.body.nombre
    },update,{
        new: true
    })
    .then((updated) => {
        if(updated){
            res.redirect('/');
        }
        else
            return res.status(400).json(null);
    }).catch(error => {
        next(error);
    })
}

module.exports.deleteBeca = (req,res,next) => {
    Beca.findOneAndDelete({
        nombre: req.params.nombre
    })
    .then((doc) => {
        if(doc)
            return res.status(200).json(doc);
        else
            return res.status(400).json(null);
    })
    .catch(err => {
        next(err);
    })
}

