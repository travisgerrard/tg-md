Parse.initialize("IjBNpvq7DaPHaydljkXBIuKsWBhPcoVttTpSMUqm", "9ZInXKheX4sJW1oknesq6zq5MpUnZFykiqu2aJ2H");

// QUOTE MODEL

var Quote = Parse.Object.extend({
    className: "Quote"
});

var QuoteCollection = Parse.Collection.extend({
    model: Quote,
});

// TAG MODEL

var Tag = Parse.Object.extend({
    className: "Tag",    
});

var TagCollection = Parse.Collection.extend({
    model: Tag,
});



