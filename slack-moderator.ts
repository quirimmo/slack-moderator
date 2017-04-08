import { SlackProxy } from "./src/SlackProxy";

console.log('Slack Moderator Started!');

let slackProxy: SlackProxy = new SlackProxy();
slackProxy.initSlack().then(bootstrapApp);

function bootstrapApp(data) {

    console.log('Slack Moderator Fully Connected!');

}