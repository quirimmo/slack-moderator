import { SlackProxy } from './SlackProxy';
import { Utils } from './../utility/Utils';

class SlackUser {

    private constructor() { }

    public static getUsersList(): Promise<any> {
        let returnPromise: Promise<any> = new Promise((resolve: any, reject: any) => {
            SlackProxy.getInstance().webClient.users.list((err: any, res: any) => {
                Utils.onMethodResults(err, res, 'members', resolve, reject);
            });
        });
        return returnPromise;
    }

    public static getUserById(userID: string): Promise<any> {
        return this.getUsersList().then((members: any) => {
            return members.find((member: any) => {
                return member.id === userID;
            });
        });
    }

    // needs the paid version of slack in order to get accesses logs
    public static analyseAccesses(): void {
        SlackUser.accessLogs().then((logins) => {
            // OBJECT STRUCTURE
            // "user_id": "U12345",
            // "username": "bob",
            // "date_first": 1422922864,
            // "date_last": 1422922864,
            // "count": 1,
            // "ip": "127.0.0.1",
            // "user_agent": "SlackWeb Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/41.0.2272.35 Safari\/537.36",
            // "isp": "BigCo ISP",
            // "country": "US",
            // "region": "CA"

            // this.sendMessageToAllModerators(Utils.getFileSharingMsgText(user, channel, msg));
        });
    }

    public static accessLogs(): Promise<any> {
        var returnPromise: Promise<any> = new Promise((resolve: any, reject: any) => {
            SlackProxy.getInstance().webClient.team.accessLogs(function(err, res) {
                Utils.onMethodResults(err, res, 'logins', resolve, reject);
            });
        });
        return returnPromise;
    }

}

export { SlackUser };