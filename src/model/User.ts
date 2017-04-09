class User {
    id: string;
    name: string;
    realName: string;

    constructor(id?: string, name?: string, realName?: string) {
        if (id) this.id = id; 
        if (name) this.name = name; 
        if (realName) this.realName = realName; 
    }
}

export { User };