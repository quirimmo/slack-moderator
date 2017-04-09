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
}

export { Message };