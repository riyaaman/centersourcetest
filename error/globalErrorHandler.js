const globalErrorHandler = (error, req, res, next) => {
    const DEV_MODE = Boolean(process.env.DEVELOPMENT_MODE);
  
    if (DEV_MODE) {
      res.status(500).json({
        status: false,
        error: error,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.log({
        error: error,
        message: error.message,
        stack: error.stack,
      });
  
      res.status(500).json({
        status: false,
        message: 'Something went wrong!.',
      });
    }
  };
  
  module.exports = globalErrorHandler;
  