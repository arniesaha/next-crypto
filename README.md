## Next-crypto: is a demo project based on Nextjs boilerplate. 

## Features:
- Authentication: [AWS Amplify & Cognito Pools](https://docs.aws.amazon.com/appsync/latest/devguide/welcome.html)
- Database: [DynamoDB](https://aws.amazon.com/dynamodb/)
- GraphQL: [AWS AppSync](https://aws.amazon.com/appsync/) (Server) & [AWS AppSync React & Apollo](https://aws.amazon.com/appsync/resources/) (Client)

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



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
