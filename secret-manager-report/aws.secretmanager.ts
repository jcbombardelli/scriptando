import 'dotenv/config';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager'
import * as utils from './utils/index';
import { AWSCredentials } from './models/aws-credentials';

async function main() {
  const files = await utils.readAllJSONFilesFromDirectory<AWSCredentials>('./in')
  
  for (const env of files) {
    const client = new SecretsManagerClient({
      region: env.region || '',
      credentials: {
        accessKeyId: env.accessKey || '',
        secretAccessKey: env.secretKey || '',
      },
    })

    const response = await client.send( new GetSecretValueCommand( { SecretId: env.secretsManager } ) )
    if(!response.SecretString) throw new Error("Secret String Not Found");
      
    const secrets = JSON.parse(response.SecretString);
    const filename = `${Date.now().toString()}-dump-secret-manager-${env.secretsManager}.json`;
    
    await utils.saveJsonFile(`./out/${filename}`, secrets);

  }
}

main()
