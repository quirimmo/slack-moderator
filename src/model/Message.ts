import { File } from "./File";

class Message {
    id: string;
    text: string;
    timestamp: number;
    file: File;
}

export { Message };