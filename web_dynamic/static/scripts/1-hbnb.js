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
});
