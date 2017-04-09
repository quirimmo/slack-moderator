import { SlackProxy } from "./src/service/SlackProxy";
import { SlackMessage } from "./src/service/SlackMessage";
import { SlackUser } from "./src/service/SlackUser";

console.log('Slack Moderator Started!');

SlackProxy.getInstance().bindActionOnMessageReceived(function(msg) {
    // moderate text messages
    SlackMessage.analyseMessagesForInappropriateWords(msg);

    // detect file sharing
    SlackMessage.analyseMessagesForFileSharing(msg);
});

// detect external accesses every five minutes
setInterval(SlackUser.analyseAccesses, 60 * 5 * 1000);