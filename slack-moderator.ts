import { SlackChannel } from "./src/service/SlackChannel";
import { Channel } from "./src/model/Channel";

console.log('Slack Moderator Started!');

let testingChannelID: string = 'C49K0TXPC';
SlackChannel.getChannelByID(testingChannelID).then((channel: any) => {
    let selectedChannel: Channel = new Channel(channel.id, channel.name);
    console.log(selectedChannel);
});


// SlackProxy.getInstance().initRTMPromise.then((data: any) => {
//     console.log('Promise RTM Resolved');
// });