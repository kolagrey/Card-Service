module.exports = (req, res, next) => {
  const sessionToken = req.headers.authorization;
  if (typeof (sessionToken) !== 'undefined') {
    if (sessionToken === 'QBHtQdOP63jqP7bysGrB9N1sBZdmVh8H5RdOQXzdw') {
      next();
    } else {
      res.status(401).send({success: false, message: 'Access Denied...'});
    }
  }else{
    res.status(401).send({success: false, message: 'Access Denied...'});
  }
}