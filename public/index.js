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

$.getJSON("/Posts", function(data) {
  // Call our function to generate a table body
  displayResults(data);
});

goHome = () => {
  $.ajax({
    url: "/Posts",
    method: "GET"
  }).then(response => {
    displayResults(response);
  });
};

$("#home").on("click", () => {
  goHome();
});

$("#scrape").on("click", () => {
  $.ajax({
    url: "/scrape",
    method: "GET"
  }).then(response => {
    alert(response);
    goHome();
  });
});

$("#clear-db").on("click", () => {
  $.ajax({
    url: "/Clear",
    method: "POST"
  }).then(response => {
    alert(response);
    goHome();
  });
});

$("#view-saved").on("click", () => {
  $.ajax({
    url: "/Posts/Saved",
    method: "GET"
  }).then(response => {
    displaySavedResults(response);
  });
});

$(document).on("click", "#save", function() {
  const thisId = $(this).attr("data-id");
  console.log(thisId);
  $.ajax({
    url: "/Posts/" + thisId,
    method: "POST"
  }).then(function(data) {
    alert(data);
    goHome();
  });
});

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
