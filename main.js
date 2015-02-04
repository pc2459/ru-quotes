// Create an array of quote objects
var quotes = [];
// var ratingEls = 0;
var undo;

/////////////////
// Quote class //
/////////////////

var Quote = (function(){

  var Quote = function(text, author, rating){
    this.id = _.uniqueId();
    this.text = text;
    this.author = author;
    this.rating = rating;
  };

  /**
   * Create DOM element of a quote
   */
  Quote.prototype.create = function(){
    // var ratingEl = buildRatingEl(this.rating);
    
    // Get HTML from the template 
    var source = $("#quote-template").html();
    // Compile the template
    var template = Handlebars.compile(source);

    var quote = $(template(this));

    // Set the rating
    quote.find(":radio[value="+this.rating+"]").prop("checked",true);

    return quote;

  };

  return Quote;

})();

/**
 * Add a quote upon a click event
 * @param {click event} event
 */
var addQuote = function(event){
  event.preventDefault();
  // Check if quote is already in the array
  if ( _.find(quotes,function(quote){ return quote.text === $('.quote-input').val(); })) 
  {
    alert("Sorry, this quote is already in the database!");
  }
  // Push new ones into the array
  else {
    var newQuote = new Quote($('.quote-input').val(),
                            $('.author-input').val());
    quotes.push(newQuote);
    loadQuotes();
  }
  // Reset the form
  $('.quote-input').val("Witty quote here...");
  $('.author-input').val("");
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
 * Delete quote upon a click event
 * @return {[type]} [description]
 */
var deleteQuote = function(){
  var quote = $(this).closest('.quote');
  var text = quote.find('.quote-text').text();

  // Search for and remove quote from the array
  for(var i = 0; i < quotes.length; i++){
    if (quotes[i].text === text){
      undo = quotes[i];
      quotes.splice(i,1);
      break;
    }
  }
  // Activate the undo button 
  $('.undo').removeClass('inactive');
  loadQuotes();
};

/**
 * Undo the last delete action by restoring the last quote
 * to the array 
 */
var undoDelete = function(){
  // Check to see if there's an undo to be undone
  if (undo !== undefined){
    quotes.push(undo);
    undo = undefined;
    $('.undo').addClass('inactive');
    loadQuotes();  
  }
};

/**
 * Render all quotes by an author to page upon clicking 
 * an author's name
 */
var renderByAuthor = function(){
    var author = $(this).text(); 
    var allByAuthor = _.chain(quotes)
                        .filter(function(quote){ return quote.author === author;  })
                        .sortBy(function(quote){    return -(quote.rating); })
                        .map(function(quote){ return quote.create(); })
                        .value();
    $('.quotes').empty()
                .append(allByAuthor);

};
/**
 * Render a random quote in a popup
 */
var renderRandom = function(){

    var popup = $('<div class="lightbox-bg">');
    var popupInner = $('<div class="lightbox">')
        .append(quotes[_.random(0,quotes.length-1)].create())
        .append('<p><a href="#" id="close-lightbox">Close</a></p>');
    popup.append(popupInner);
    $('body').append(popup);

};

/**
 * Empty and reload all quotes into the DOM
 */
var loadQuotes = function(){
  $('.quotes').empty();
  var sortedQuotes = _.sortBy(quotes, function(quote){
    return -(quote.rating);
  });
  var allQuotes = _.map(sortedQuotes, function(quote){ return quote.create(); });
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

  // Toggle add-a-quote form
  $('body').on('click','.add',function(){
    $('.form-wrapper').toggle();
    var text = $(this).text();
    $(this).text( text === "Add A Quote" ? "Nevermind" : "Add A Quote" ) ; 
  });

  // Load all quotes 
  $('body').on('click','.title',loadQuotes);
  
  // Add a quote
  $('.submit').on('click', addQuote);

  // Delegated quote rating
  $('body').on('click','input:radio', rateQuote);  

  // Delete a quote
  $('body').on('click','.quote-delete', deleteQuote);

  // Undo last delete
  $('.undo').on('click', undoDelete);

  // Render quotes by an author
  $('body').on('click','.quote-author',renderByAuthor);

  // Render a random quote in a popup
  $('body').on('click','.random-quote',renderRandom);

  // Close popups
  $('body').on('click','#close-lightbox',function(){
    $('.lightbox-bg').remove();
  });
  
});