import { SlackChannel } from "./src/SlackChannel";
import { Channel } from "./src/Channel";

console.log('Slack Moderator Started!');

// SlackChannel.getChannelsList().then((channels: any) => {
//     console.log(channels);
// });
SlackChannel.getChannelByID('C49K0TXPC').then((channel: any) => {
    let selectedChannel: Channel = new Channel(channel.id, channel.name);
    console.log(selectedChannel);
});

// SlackProxy.getInstance().getRTMPromise().then((data: any) => {
//     console.log('Promise RTM Resolved');
// });