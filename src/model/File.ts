class File {
    id: string;
    name: string;
    title: string;
    filetype: string;
    permalink: string;

    constructor(id?: string, name?: string, title?: string, filetype?: string, permalink?: string) {
        if (id) this.id = id;
        if (name) this.name = name;
        if (title) this.title = title;
        if (filetype) this.filetype = filetype;
        if (permalink) this.permalink = permalink;
    }
}

export { File };