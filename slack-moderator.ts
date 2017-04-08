import { SlackChannel } from "./src/SlackChannel";

console.log('Slack Moderator Started!');

SlackChannel.getPublicChannelsList().then((channels: any) => {
    console.log(channels);
});