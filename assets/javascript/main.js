var topics = [
	"A Christmas Story", "Elf", "The Grinch", "Home Alone", "It's a Wonderful Life", "Polar Express", "The Santa Clause", ]

function makeButton(topic) {
	$("<button>")
		.data("topic", topic)
		.addClass("button")
		.text(topic)
		.appendTo($("#buttonContainer"))
}

$.each(topics, function(i, v) {
	makeButton(v);
});

$("#submitBttn").on("click", function(e) {
	e.preventDefault();

	let topic = $("#inputTxt").val().trim();
	$("#inputTxt").val("")

	if (topic != "" && $.inArray(topic, topics) == -1) {
		makeButton(topic);
		topics.push(topic);
	}
});

$("#buttonContainer").on("click", ".button", function(e) {
	let topic = encodeURIComponent($(this).data("topic"));
	var apiKey = "3Ys6MiHRcrJvO8SNPXB7vFYPvcoqYWQF"; 
	var uriBase = "https://api.giphy.com/v1/gifs/search";

	$("#imageContainer").empty();

	$.ajax({
		url: uriBase + "?rating=pg-13&limit=10&q=" + topic + "&api_key=" + apiKey,
	}).done(function(data) {
		
		for (var i = 0; i < data.data.length; i++) {
			var img = data.data[i]
			var animating = false;

			var imgJQ = $("<img>").attr("src", img.images.original_still.url)

			$("<div>")
				.addClass("gifDiv")
				.appendTo($("#imageContainer"))
				.append( $("<span>").text("Rating: " + img.rating))
				.prepend(imgJQ)
				
			.on("click", function(e) {
				animating = !animating;
				imgJQ.attr("src", img.images["original" + (animating ? "" : "_still")].url);
			});

			// Preload animated gif
			$("<img>").attr("src", img.images.original.url)
			.on("load", function(e) {
				$(this).remove();
			});
		}

	})
});