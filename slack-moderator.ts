import { SlackChannel } from "./src/service/SlackChannel";
import { SlackMessage } from "./src/service/SlackMessage";
import { Channel } from "./src/model/Channel";

console.log('Slack Moderator Started!');

// let testingChannelID: string = 'C49K0TXPC';
// SlackChannel.getChannelByID(testingChannelID).then((channel: any) => {
//     let selectedChannel: Channel = new Channel(channel.id, channel.name);
//     console.log(selectedChannel);
// });

SlackMessage.sendMessageThroughWeb('message from typescript!', 'C4CPLRVUH').then((response: any) => {
    console.log('Message sent!');
});

// SlackProxy.getInstance().initRTMPromise.then((data: any) => {
//     console.log('Promise RTM Resolved');
// });