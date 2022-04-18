# Getting started

It's very easy to get started with [Slater](https://tryslater.com) and deploy your first Next.js cron job.

## Install Slater Vercel integration

Head to [https://vercel.com/integrations/slater](https://vercel.com/integrations/slater) and click the "Add Integration" button. Select "all projects" and follow through the signup prompts.

At the end, this will kick off an email to your email address associated with your Vercel account.

You need to "claim" your account to finalize the integration by clicking the link in your email.

## Add Slater to your Next.js app

To add your first cron job in a Next.js app, we need to make some code changes.

You'll also need to temporarily install Slater dependencies in your Next.js app until we ship a package.

```bash
yarn add imurmurhash
```

or

```bash
npm add imurmurhash
```

then create `pages/api/slater/[...slater].js file with the following contents:

```js
const config = {
  queues: [
    {
      name: "helloWorld",
      schedule: "0 7 * * *", // 7AM GMT
      handler: async (event, success, failure) => {
        try {
          const results = await fetch("https://drew.tech/api/test");
          const data = await results.json();
          if (results.ok) {
            return success(data);
          } else {
            return failure(data);
          }
        } catch (err) {
          return failure(err); // sends 500
        }
      },
    },
  ],
};

const MurmurHash3 = require("imurmurhash");

export default async function handler(req, res) {
  const successHandler = (props) => {
    console.log("success");
    return props;
  };
  const errorHandler = (props) => {
    console.log("error");
    return props;
  };
  const { slater } = req.query;

  const queueName = slater[0];

  if (queueName === "status") {
    const results = config.queues.map((queue) => {
      return {
        name: queue.name,
        retry: queue.retry,
        backoff: queue.backoff,
        schedule: queue.schedule,
        handlerVersion: MurmurHash3(queue.handler.toString()).result(),
      };
    });
    return res.end(JSON.stringify(results));
  }
  const queue = config.queues.find((q) => q.name === queueName);

  if (!queue) {
    return res.status(404).send(`Queue ${queueName} not found`);
  }

  if (queue.secret !== req.query.secret) {
    return res.status(401).send(`Queue ${queueName} secret incorrect`);
  }

  if (!queue.handler) {
    return res.status(500).send(`Queue ${queueName} has no handler`);
  }

  try {
    const results = await queue.handler(slater, successHandler, errorHandler);

    return res.status(200).send(results);
  } catch (err) {
    errorHandler(err);
    return res.status(500).send(err);
  }
}
```

## Deploy to production

Slater only picks up production changes, so make sure you're pushing your Vercel changes all the way to produciton.
