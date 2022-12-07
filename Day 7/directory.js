class Directory {
    constructor(name) {
        this.name = name;
        this.children = [];
        this.size = 0;
    }
    
    addChild(child) {
        this.children.push(child);
    }
    
    addSize(size) {
        this.size += size;
    }
}