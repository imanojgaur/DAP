type BaseProduct = { name: string; price: number };
type DigitalFeatures = { downloadLink: string };

// Intersection (&) merges them inclusively
type DigitalProduct = BaseProduct & DigitalFeatures;

// Let's say this comes from a messy database fetch
const dbResult = { 
    name: "E-Book", 
    price: 15, 
    downloadLink: "/files/book.pdf", 
    // EXTRA EXCESS PROPERTIES:
    createdAt: "2023-01-01",
    authorId: 99,
    internalDbHash: "x8f9a"
};

// SUCCESS! No errors.
const myProduct: DigitalProduct = { ...dbResult };