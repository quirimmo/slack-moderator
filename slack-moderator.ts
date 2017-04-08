import { SlackProxy } from "./src/SlackProxy";

console.log('Slack Moderator Started!');

let slackProxy: SlackProxy = new SlackProxy();
slackProxy.initSlack().then((data) => {
    console.log('Slack Moderator Fully Connected!');
});