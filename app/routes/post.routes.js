module.exports = app => {
    const posts = require("../controller/post.controller.js");
  
    var router = require("express").Router();
  
    // Cria uma nova postagem
    router.post("/", posts.create);
  
    // Busca todas as postagens
    router.get("/", posts.findAll);
  
    // Busca todas as postagens publicadas
    router.get("/published", posts.findAllPublished);
  
    // Busca uma postagens específica pelo id
    router.get("/:id", posts.findOne);
  
    // Atualiza uma postagens específica pelo id
    router.put("/:id", posts.update);
  
    // Deleta uma postagens específica pelo id
    router.delete("/:id", posts.delete);
  
    // Deleta todas as postagens
    router.delete("/", posts.deleteAll);
  
    app.use('/api/posts', router);
  };