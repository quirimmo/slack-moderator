import { SlackProxy } from './SlackProxy';
import { Utils } from './../utility/Utils';

class SlackChannel {

    private constructor() { }

    /**
     * Get the list of all the public channels associated to the user web token api team
     */
    public static getPublicChannelsList(): Promise<any> {
        let returnPromise: Promise<any> = new Promise((resolve: (data: any) => void, reject: (data: any) => void) => {
            SlackProxy.getInstance().webClient.channels.list((err: any, res: any) => {
                Utils.onMethodResults(err, res, 'channels', resolve, reject);
            });
        });
        return returnPromise;
    }

    
    /**
     * Get the list of all the private channels and all the groups associated to the user web token api team
     */
    public static getPrivateChannelsList(): Promise<any> {
        let returnPromise: Promise<any> = new Promise((resolve: (data: any) => void, reject: (data: any) => void) => {
            SlackProxy.getInstance().webClient.groups.list(function(err, res) {
                Utils.onMethodResults(err, res, 'groups', resolve, reject);
            });
        });
        return returnPromise;
    }

    /**
     * Get the list of all the public and private channels associated to the user web token api team
     */
    public static getChannelsList(): Promise<any> {
        let promises: Array<Promise<any>> = [
            this.getPrivateChannelsList(),
            this.getPublicChannelsList()
        ];
        return Promise.all(promises).then((data: any) => {
            let channels: Array<any> = [];
            return channels.concat(data[0], data[1]);
        });
    }
    
    /**
     * Get the channel corresponding to the given ID 
     * @param channelID The id of channel to be retrieved
     */
    public static getChannelByID(channelID: string): Promise<any> {
        return SlackChannel.getChannelsList().then((channels: any) => {
            return channels.find((channel: any) => {
                return channel.id === channelID;
            });
        });
    }

    /**
     * Kick out a user from a channel
     * @param userID The id of the user to be kicked out
     * @param channelID The id of the channel where the user is
     */
    public static kickOutUserFromChannel(userID: string, channelID: string): Promise<any> {
        let returnPromise: Promise<any> = new Promise((resolve: any, reject: any) => {
            SlackProxy.getInstance().webClient.channels.kick(channelID, userID, (err: any, res: any) => {
                Utils.onMethodResults(err, res, undefined, resolve, reject);
            });
        });
        return returnPromise;
    }

}

export { SlackChannel };