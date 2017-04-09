import { SlackProxy } from "./src/service/SlackProxy";
import { SlackMessage } from "./src/service/SlackMessage";
import { SlackUser } from "./src/service/SlackUser";

console.log('Slack Moderator Started!');

// execute code everytime a message is received in one of the channels where the bot is active
SlackProxy.getInstance().bindActionOnMessageReceived(function(msg) {
    // moderate text messages
    SlackMessage.analyseMessagesForInappropriateWords(msg);

    // detect file sharing
    SlackMessage.analyseMessagesForFileSharing(msg);
});

// detect external accesses every five minutes
// needs the paid version of slack in order to be executed, otherwise it will throw the error "paid version needed"
// setInterval(SlackUser.analyseAccesses, 60 * 5 * 1000);