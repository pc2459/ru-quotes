// Create an array of quote objects
var quotes = [];
var ratingEls = 0;

/////////////////
// Quote class //
/////////////////

var Quote = function(text, author, rating){
  this.text = text;
  this.author = author;
  this.rating = rating;
};

/**
 * Create DOM element of a quote
 */
Quote.prototype.create = function(){

  var ratingEl = buildRatingEl(this.rating);

  this.$quoteEl = $('<div>')
      .addClass('quote')
      .append('<p class="quote-text">' + this.text + '</p>')
      .append('<p class="quote-author">' + this.author + '</p>')
      .append('<span class="quote-delete"><img src="delete.svg"></span>')
      .append(ratingEl);
  return this.$quoteEl; 
};


/**
 * Helper function to build up a star-rating DOM element
 * with a pre-set rating when needed
 * @param  {number} rating 
 */
var buildRatingEl = function(rating){
  var ratingEl = $('<span>')
      .addClass("rating")
      .append('<input type="radio" name="rating'+ (++ratingEls) +'" value="1"><i></i>')
      .append('<input type="radio" name="rating'+ ratingEls +'"  value="2"><i></i>')
      .append('<input type="radio" name="rating'+ ratingEls +'"  value="3"><i></i>')
      .append('<input type="radio" name="rating'+ ratingEls +'"  value="4"><i></i>')
      .append('<input type="radio" name="rating'+ ratingEls +'"  value="5"><i></i>');

  ratingEl.find(":radio[value="+rating+"]").prop("checked",true);
  return ratingEl;
};

/**
 * Helper function to create quote elements
 * @param  {Quote} quote 
 */
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
 * Rate a quote upon a click event
 */
var rateQuote = function(){
  //Get value 
  var value = $(this).val();
  var text = $(this).closest('.quote').find('.quote-text').text();
  var foundQuote = _.find(quotes,function(quote){
    return quote.text === text;
  });

  // Update the rating of the quote
  foundQuote.rating = value;
  loadQuotes();
};

/**
 * Empty and reload all quotes into the DOM
 */
var loadQuotes = function(){
  $('.quotes').empty();
  var sortedQuotes = _.sortBy(quotes, function(quote){
    return -(quote.rating);
  });
  var allQuotes = _.map(sortedQuotes, buildQuoteEls);
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
  
  // Add a quote
  $('.submit').on('click', addQuote);

  // Delegated quote rating
  $('body').on('click','input:radio', rateQuote);  




// Render quotes by an author

// Delete a quote
  //Store in a variable to restore later???

// Undo last delete
  

// Render list of all quotes

// Render a random quote in a popup

  
});