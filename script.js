$(function () { 
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {

  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";

 
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // ... Rest of the code remains the same ...

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {

    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML,
      true); // Explicitly setting the flag to get JSON from the server processed into an object literal
  });


  function buildAndShowHomeHTML(categories) {

 
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {

        
        var chosenCategory = chooseRandomCategory(categories);

        
        var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, "randomCategoryShortName", chosenCategory.short_name);

       
        insertHtml("#main-content", homeHtmlToInsertIntoMainPage);

      },
      false); // False here because we are getting just regular HTML from the server, so no need to process JSON.
  }

  // ... Rest of the code remains the same ...

  // Given array of category objects, returns a random category object.
  function chooseRandomCategory(categories) {
    // Choose a random index into the array (from 0 inclusively until array length (exclusively))
    var randomArrayIndex = Math.floor(Math.random() * categories.length);

    // Return category object with that randomArrayIndex
    return categories[randomArrayIndex];
  }

  // ... Rest of the code remains the same ...

  global.$dc = dc;

})(window);
