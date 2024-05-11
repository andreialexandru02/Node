const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}: ${req.method} ${req.url}`);
  
    if (req.body) {
      console.log('Request Body:', req.body);
    }
  
    next();
  }
  
  module.exports = logger;