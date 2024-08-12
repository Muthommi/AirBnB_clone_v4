$(document).ready(function () {
    const selectedAmenities = {};

    // Listen for changes on each checkbox input
    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            // Add amenity ID and name to the selected amenities
	    selectedAmenities[amenityId] = amenityName;
        } else {
            // Remove amenity ID and name from the selected amenities
	    delete selectedAmenities[amenityId];
        }

        // Update the amenities list in the <h4> tag
	const amenitiesList = Object.values(selectedAmenities).join(', ');
        $('div.amenities h4').text('Amenities: ' + amenitiesList);
    });

    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    // Request places from the API
    function fetchPlaces(data) {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (places) {
	        const placesSection = $('section.places');
	        placesSection.empty();

	        // Loop through each place and create an article tag
	        for (let place of places) {
	            const article = $('<article></article>');
	            const titlebox = $('<div class="title_box"></div>');
	            titleBox.append('<h2>' + place.name + '</h2>');
	            titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
	            titleBox.append(titleBox);

	            // Additional place content (optional)
	            const information = $('<div class="information"></div>');
	            information.append('<div class="max_guest">' +place.max_guest + ' Guests</div>');
	            information.append('<div class="number_rooms">' + place.number_rooms + ' Bedrooms</div>')
	            information.append('<div class="number_bathrooms">' +place.number_bathrooms + ' Bathrooms</div>');
	            information.append(information)

	            // Description
		    const description = $('<div class="description"></div>');
	            description.text(place.description);
	            article.append(description);


	            placesSection.append(article);
	        }
	    }
        });
      }
      // Initial fetch with no filters
      fetchPlaces({})

      // Filter places when the search button is clicked
      $('button').click(function () {
          const amenities = Object.keys(selectedAmenities);
          fetchPlaces({ amenities: amenities, });
      });
});
