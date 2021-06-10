
  exports.success = function (req, res, data, status) {
    let statusCode = status || 200;
    let statusMessage = data || "";
  
    res.status(statusCode).send({
      error: false,
      status: statusCode,
      data: statusMessage
    });
  };
  
  exports.error = function (req, res, data, status) {
    let statusCode = status || 500;
    let statusMessage = data || "Internal server error";
  
    res.status(statusCode).send({
      error: true,
      status: statusCode,
      data: statusMessage
    });
  };