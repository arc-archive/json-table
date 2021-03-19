/** @typedef {import('@web/test-runner').TestRunnerConfig} TestRunnerConfig */

export default /** @type TestRunnerConfig */ ({
  files: 'test/**/*.test.js',
  nodeResolve: true,
  middleware: [
    function rewriteBase(context, next) {
      if (context.url.indexOf('/base') === 0) {
        context.url = context.url.replace('/base', '')
      }
      return next();
    }
  ],
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
});
