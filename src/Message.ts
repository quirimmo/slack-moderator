import { File } from "./File";

interface Message {
    id: string;
    text: string;
    timestamp: number;
    file: File;
}

export { Message };