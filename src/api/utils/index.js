const wrapWithPromise = wrappedFunction => (...args) =>
  new Promise((resolve, reject) => {
    wrappedFunction(...args, (error, stats) => {
      return error ? reject(error) : resolve(stats);
    });
  });

module.exports = wrapWithPromise;