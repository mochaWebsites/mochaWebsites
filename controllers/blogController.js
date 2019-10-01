const path = require('path');

exports.getBlog = (req, res, err) => {
  const blogTitle = req.params.title;
  const blogPath = path.join(blogTitle);
  console.log(blogPath);

  res.render(blogPath, {layout: 'default', template: 'blog'});
}
