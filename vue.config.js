module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/english/" : "/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "English";
      return args;
    });
  }
};
