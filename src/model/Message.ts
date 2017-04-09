import { File } from "./File";

class Message {
    id: string;
    text: string;
    channel: string;
    user: string;
    type: string;
    subtype: string;
    timestamp: number;
    file: File;

    constructor(id?: string, text?: string, channel?: string, user?: string, type?: string, subtype?: string, timestamp?: number, file?: File) {
        if (id) this.id = id;
        if (text) this.text = text;
        if (channel) this.channel = channel;
        if (user) this.user = user;
        if (type) this.type = type;
        if (subtype) this.subtype = subtype;
        if (timestamp) this.timestamp = timestamp;
        if (file) this.file = file;
    }

}

export { Message };