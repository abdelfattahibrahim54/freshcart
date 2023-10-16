export interface Welcome {
    results:  number;
    metadata: Metadata;
    data:     categories[];
}

export interface categories {
image: any;
    _id:       string;
    name:      string;
    slug:      string;
    xcb:     string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
}
