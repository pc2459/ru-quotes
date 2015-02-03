// Create an array of quote objects
var quotes = [];


/////////////////
// Quote class //
/////////////////

var Quote = function(text, author, rating){
  this.text = text;
  this.author = author;
  this.ranking = rating;
};

/**
 * Create DOM element of a quote
 */
Quote.prototype.create = function(){
  var ratingEl = $('<span>')
      .addClass("rating")
      .append('<input type="radio" name="rating" value="1"><i></i>')
      .append('<input type="radio" name="rating" value="2"><i></i>')
      .append('<input type="radio" name="rating" value="3"><i></i>')
      .append('<input type="radio" name="rating" value="4"><i></i>')
      .append('<input type="radio" name="rating" value="5"><i></i>');

  this.$quoteEl = $('<div>')
      .addClass('quote')
      .append('<p class="quote-text">' + this.text + '</p>')
      .append('<p class="quote-author">' + this.author + '</p>')
      .append('<span class="quote-delete"><img src="delete.svg"></span>')
      .append(ratingEl);
  return this.$quoteEl; 
};

var buildQuoteEls = function(quote){
  return quote.create();
};

/**
 * Add a quote upon a click event
 * @param {click event} event
 */
var addQuote = function(event){  
  var newQuote = new Quote($('.quote-input').val(),
                          $('.author-input').val());
  quotes.push(newQuote);
  loadQuotes();
  return false;
};

/**
 * Empty and reload all quotes into the DOM
 */
var loadQuotes = function(){
  $('.quotes').empty();
  var allQuotes = _.map(quotes, buildQuoteEls);
  $('.quotes').append(allQuotes);
};

/**
 * Auto-load quotes into the global quotes array
 * @param  {array} arr Array of pre-written quotes
 */
var autoLoad = function(arr){
  _.each(arr, function(quote){
    var newQuote = new Quote(quote.text, quote.author, quote.rating);
    quotes.push(newQuote);
  });
  loadQuotes();
};

//==========================================

$(document).on('ready', function() {

  autoLoad(quoteData);
  
  $('.submit').on('click', addQuote);


// Delete a quote
  //Store in a variable to restore later???

// Undo last delete

// Rate a quote

// Render quotes by an author

  

// Render list of all quotes

// Render a random quote in a popup

  
});