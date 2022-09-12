const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  insert(article) {
    return this.connection.query(
      `insert into ${this.table} (title, img, descr) values (?, ?, ?)`,
      [article.title, article.img, article.descr]
    );
  }

  update(article) {
    return this.connection.query(
      `update ${this.table} set title = ?, img = ?, descr = ? where id = ?`,
      [article.title, article.img, article.descr, article.id]
    );
  }
}

module.exports = ArticleManager;
