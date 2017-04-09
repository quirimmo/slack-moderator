import { SlackProxy } from "./src/service/SlackProxy";
import { SlackChannel } from "./src/service/SlackChannel";
import { SlackMessage } from "./src/service/SlackMessage";
import { SlackUser } from "./src/service/SlackUser";
import { Message } from "./src/model/Message";
import { Channel } from "./src/model/Channel";
import { User } from "./src/model/User";
import { File } from "./src/model/File";

console.log('Slack Moderator Started!');

SlackProxy.getInstance().bindActionOnMessageReceived(function(msg) {

    console.log(msg);

    // File f = new File();

    // moderate text messages
    // SlackMessage.analyseMessagesForInappropriateWords(msg);

    // detect file sharing
    // SlackMessage.analyseMessagesForFileSharing(msg);
});

// detect external accesses every five minutes
setInterval(SlackUser.analyseAccesses, 60 * 5 * 1000);




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