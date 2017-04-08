import { SlackChannel } from "./src/SlackChannel";

console.log('Slack Moderator Started!');

SlackChannel.getChannelsList().then((channels: any) => {
    console.log(channels);
});

// SlackProxy.getInstance().getRTMPromise().then((data: any) => {
//     console.log('Promise RTM Resolved');
// });