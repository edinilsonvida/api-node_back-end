const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Cria e salva uma nova postagem no banco de dados.
exports.create = (req, res) => {
    // Valida a requisição
    if (!req.body.title) {
        res.status(400).send({
            message: "Conteúdo não pode ser vazio!"
        });
        return;
    }

    // Cria uma postagem
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Salva uma postagem no banco de dados
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu enquanto criava uma postagem."
            });
        });
};


// Busca todas as postagens do banco de dados.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Post.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu enquanto recuperava as postagens."
        });
      });
  };

// Busca uma postagem específica pelo id da requisição.
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Post.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: `Algum erro ocorreu enquanto recuperava uma postagem pelo id=${id}.`
        });
      });
  };

// Atualiza uma postagem específica pelo id da requisição.
exports.update = (req, res) => {
    const id = req.params.id;
  
    Post.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Postagem foi atualizada com sucesso."
          });
        } else {
          res.send({
            message: `Não foi possível atualizar a postagem com o id=${id}. Provavelmente a postagem não foi encontrada ou o id está vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Algum erro ocorreu enquanto atualizava uma postagem pelo id=${id}.`
        });
      });
  };

// Deleta uma postagem específica pelo id da requisição.
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Postagem foi deletada com sucesso!"
          });
        } else {
          res.send({
            message: `Não foi possível deletar a postagem com o id=${id}. Provavelmente a postagem não foi encontrada ou o id está vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Algum erro ocorreu enquanto deletava uma postagem pelo id=${id}.`
        });
      });
  };

// Deleta todas as postagens do banco de dados.
exports.deleteAll = (req, res) => {
    Post.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} postagens foram deletadas com sucesso!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu enquanto deletava todas as postagens."
        });
      });
  };

// Busca todas as postagens publicadas.
exports.findAllPublished = (req, res) => {
    Post.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu enquanto recuperava as postagens publicadas."
        });
      });
  };