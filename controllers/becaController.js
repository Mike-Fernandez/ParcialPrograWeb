var Beca = require('../models/beca');

module.exports.getBeca = (req,res,next) => {
    Beca.findOne({
        nombre: req.params.nombre
    })
    .then((found) => {
        if(found)
            return res.render('search',{title: 'BecaViewer', beca: found});
//            return res.status(200).json(found);
        else
            return res.status(400).json("Programa de becas no existe");
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
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    
    Beca.find({})
    .limit(perPage)
    .skip(perPage * page)
    .sort({ [sortProperty]: sort})
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
//            return res.status(201).json(beca.nombre)
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
            return res.redirect('/');
//            return res.json(updated);
        }
        else
            return res.status(400).json(null);
    }).catch(error => {
        next(error);
    })
}

module.exports.deleteBeca = (req,res,next) => {
    console.log("Deleting, sent from controller " + req.body.nombre);
    Beca.findOneAndDelete({
        nombre: req.body.nombre
    })
    .then((doc) => {
        if(doc)
        return res.redirect('/');
//            return res.status(200).json(null);
        else
            return res.status(404).json(null);
    })
    .catch(err => {
        next(err);
    })
}

