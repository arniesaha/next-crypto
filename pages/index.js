import AWSAppSyncClient from 'aws-appsync'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react' // this needs to also be installed when working with React
import Amplify, {Analytics} from 'aws-amplify';
import App from './components/App'
import { Auth } from 'aws-amplify';

const AppSyncConfig = {
  "aws_project_region": "us-east-1",
  "aws_appsync_graphqlEndpoint": "https://qvgxgekg7zhbdlng4gld4jnkqi.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": 'AMAZON_COGNITO_USER_POOLS',
  "aws_appsync_apiKey": "da2-tixt5mvpmngtjgmxze34hi3wri"
};

Amplify.configure({
    aws_appsync_graphqlEndpoint: "https://qvgxgekg7zhbdlng4gld4jnkqi.appsync-api.us-east-1.amazonaws.com/graphql",
    aws_appsync_region: "us-east-1",
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    Auth: {
      userPoolId: "us-east-1_2LoRYNZQw",
      userPoolWebClientId: "3rlvehr849u9bc203i58rgkvnk",
    }
});


const client = new AWSAppSyncClient({
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  disableOffline: true,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType,
    // apiKey: AppSyncConfig.aws_appsync_apiKe,y,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(), // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  }
})

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

export default WithProvider