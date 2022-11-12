const fastify = require('fastify')();

fastify
  .register(require('@fastify/nextjs'), {
    dev: false,
  })
  .after(() => {
    fastify.next('/*');
  });

const port = 50002;

const start = async () => {
  try {
    await fastify.listen({port});
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
