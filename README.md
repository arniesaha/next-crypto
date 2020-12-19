## Next-crypto: is a demo project based on Nextjs boilerplate. 

## Features:
- Authentication: [AWS Amplify & Cognito Pools](https://docs.aws.amazon.com/appsync/latest/devguide/welcome.html)
- Database: [DynamoDB](https://aws.amazon.com/dynamodb/)
- GraphQL: [AWS AppSync](https://aws.amazon.com/appsync/) (Server) & [AWS AppSync React & Apollo](https://aws.amazon.com/appsync/resources/) (Client)
- React & Material UI

Let's user's authenticate and login to view a list of "Crypto" coins:
##API: https://api.coinlore.com/api/tickers/

And let's users add a note or favorite them.

## Issues To-dos:
- Add pagination
- UI improvements
- Next build erros: [link](https://stackoverflow.com/questions/51757436/nextjs-reactjs-invariant-violation-react-children-only-expected-to-receive) -- Hence, deployed on Pm2 on EC2 Server
- Multiple users sessions
- Search

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
```

Run the application:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


![Screenshot](https://amplify-nextcrypto-dev-150927-deployment.s3.amazonaws.com/Screenshot+2020-12-19+at+6.27.39+PM.png)

Deployed on AWS EC2 via pm2
```bash
pm2 start "npm run dev" --name crypto --exp-backoff-restart-delay=100
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Useful Resources
- https://aws.amazon.com/blogs/architecture/things-to-consider-when-you-build-a-graphql-api-with-aws-appsync/
- https://medium.com/open-graphql/graphqlifying-rest-5a95d57a04c2
- https://github.com/aws-samples/aws-appsync-relay
- https://github.com/awslabs/aws-mobile-appsync-sdk-js
- https://blog.bitsrc.io/apollo-and-relay-side-by-side-adb5e3844935
