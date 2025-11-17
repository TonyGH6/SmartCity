
export const orMiddleware = (...middlewares) => {
  return (req, res, next) => {
    let index = 0;

    const tryNext = (err) => {
      if (!err) return next(); 

      const nextMiddleware = middlewares[index++];
      if (!nextMiddleware) {
        return res.status(403).send(err.message);
      }
      nextMiddleware(req, res, tryNext);
    };

    tryNext(new Error('start'));
  };
};