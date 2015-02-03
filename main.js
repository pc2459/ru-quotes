// Create an array of quote objects
var quotes = [];

// Create a Quote class
var Quote = function(text, author){
  this.text = text;
  this.author = author;
  this.ranking = undefined;
};

// Create a DOM element of a quote
Quote.prototype.create = function(){

  console.log(this);
  this.$quoteEl = $('<div>')
      .addClass('quote clearfix')
      .append('<p class="quote-text">' + this.text + '</p>')
      .append('<p class="quote-author">' + this.author + '</p>');
  return this.$quoteEl; 
};

var buildQuoteEls = function(quote){
  return quote.create();
};

// Add a quote
var addQuote = function(event){
  // Prevent the submit button from sending us somewhere cray
  console.log("Clicked on submit");
  var newQuote = new Quote($('.quote-input').val(),
                            $('.author-input').val());
  quotes.push(newQuote);
  console.log(quotes);
  loadQuotes();
  return false;
};



var loadQuotes = function(){
  var allQuotes = _.map(quotes, buildQuoteEls);
  console.log(allQuotes);
  console.log("GOT HERE");
  $('.quotes').append(allQuotes);
};


$(document).on('ready', function() {


  
  $('.submit').on('click', addQuote);


// Delete a quote
  //Store in a variable to restore later???

// Undo last delete

// Rate a quote

// Render quotes by an author

  

// Render list of all quotes

// Render a random quote in a popup

  
});