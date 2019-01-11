// Function that creates the table rows with data coming back from reddit, generates a save and
// delete button
function displayResults(data) {
  // Add to the table here...
  $("tbody").empty();

  data.forEach(post => {
    var tableRow = $("<tr>").append(
      $("<td>").text(post.title),
      $("<td>").html(
        `<a href=${post.link} target="_blank">
            ${post.link}
          </a>`
      ),
      $("<td>").html(
        "<button class='btn' id='save' data-id='" +
          post._id +
          "' >Save Article</button>"
      ),
      $("<td>").html(
        "<button class='btn' id='delete' data-id='" +
          post._id +
          "' >Delete Article</button>"
      )
    );

    $("tbody").append(tableRow);
  });
}
// Function that generates the table rows for the saved results coming back,
//only generates the delete button
function displaySavedResults(data) {
  // Add to the table here...
  $("tbody").empty();

  data.forEach(post => {
    var tableRow = $("<tr>").append(
      $("<td>").text(post.title),
      $("<td>").html(
        `<a href=${post.link} target="_blank">
            ${post.link}
          </a>`
      ),
      $("<td>").html(
        "<button class='btn' id='delete' data-id='" +
          post._id +
          "' >Delete Article</button>"
      )
    );

    $("tbody").append(tableRow);
  });
}

// Generate tables for the json we recieve when the /Posts route is hit
$.getJSON("/Posts", function(data) {
  // Call our function to generate a table body
  displayResults(data);
});

//Function that runs a ajax request to /Posts and then runs displayResults with the response
goHome = () => {
  $.ajax({
    url: "/Posts",
    method: "GET"
  }).then(response => {
    displayResults(response);
  });
};
// When you click go home run goHome()
$("#home").on("click", () => {
  goHome();
});
// When you click scrape run a ajax request to /scrape and then run goHome()
$("#scrape").on("click", () => {
  $.ajax({
    url: "/scrape",
    method: "GET"
  }).then(response => {
    alert(response);
    goHome();
  });
});

//When you click on clear database, run a ajax request to /Clear and run goHome()
$("#clear-db").on("click", () => {
  $.ajax({
    url: "/Clear",
    method: "POST"
  }).then(response => {
    alert(response);
    goHome();
  });
});
// When view Saved is clicked, run a ajax request to /Post/Saved and display the results
$("#view-saved").on("click", () => {
  $.ajax({
    url: "/Posts/Saved",
    method: "GET"
  }).then(response => {
    displaySavedResults(response);
  });
});

//When you click on a articles saved button, it grabs the data-id and runs a ajax request to
// /Posts/"thisarticlesdataid" to save the article and then runs goHome()
$(document).on("click", "#save", function() {
  const thisId = $(this).attr("data-id");
  $.ajax({
    url: "/Posts/" + thisId,
    method: "POST"
  }).then(function(data) {
    alert(data);
    goHome();
  });
});

//When you click on a delete button, it grabs that articles data-id and runs a ajax request
//to delete that article. It then runs goHome()
$(document).on("click", "#delete", function() {
  const thisId = $(this).attr("data-id");
  console.log(thisId);
  $.ajax({
    url: "/Posts/Saved/" + thisId,
    method: "POST"
  }).then(function(data) {
    alert(data);
    goHome();
  });
});
