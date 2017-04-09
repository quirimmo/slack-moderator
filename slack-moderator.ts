import { SlackChannel } from "./src/service/SlackChannel";
import { SlackMessage } from "./src/service/SlackMessage";
import { SlackUser } from "./src/service/SlackUser";
import { Channel } from "./src/model/Channel";
import { User } from "./src/model/User";

console.log('Slack Moderator Started!');






// SlackMessage.sendMessageToAllModerators('test').then((response: any) => {
//     console.log('Messages sent!');
// });

// SlackUser.getUsersList().then((users: any) => {
//     console.log(users);
// });


// SlackUser.getUserById('U48MJA469').then((user: any) => {
//     let selectedUser: User = new User(user.id, user.name, user.real_name);
//     console.log(selectedUser);
// });

// let testingChannelID: string = 'C49K0TXPC';
// SlackChannel.getChannelByID(testingChannelID).then((channel: any) => {
//     let selectedChannel: Channel = new Channel(channel.id, channel.name);
//     console.log(selectedChannel);
// });

// SlackMessage.sendMessageThroughRTM('message from typescript through RTM!', 'C4CPLRVUH').then((response: any) => {
//     console.log('Message sent!');
// });

// SlackProxy.getInstance().initRTMPromise.then((data: any) => {
//     console.log('Promise RTM Resolved');
// });