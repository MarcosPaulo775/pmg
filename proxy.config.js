const proxy = [
    {
      context: '/api',
      target: 'http://192.168.1.225:9090',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;