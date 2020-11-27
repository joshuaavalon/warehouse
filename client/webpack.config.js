module.exports = (env, args) =>
  args.mode === "production"
    ? require("./config/webpack.config.prod")(env, args)
    : require("./config/webpack.config.dev")(env, args);
