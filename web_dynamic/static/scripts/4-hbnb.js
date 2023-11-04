$(document).ready(function () {
    // Code for handling amenities checkboxes
    $('.amenities input[type=checkbox]').on('click', function () {
        let amenityId = $('.amenities input[type=checkbox]:checked').map(function (i, e) {
            return e.parentElement.dataset.id;
        });
        let amenityName = $('.amenities input[type=checkbox]:checked').map(function (i, e) {
            return e.parentElement.dataset.name;
        });
        let allamen = '';
        let concat = ', ';
        for (let i = 0; i < amenityName.length; i++) {
            if (i === amenityName.length - 1) {
                concat = '';
            }
            allamen += amenityName[i] + concat;
        }
        $('.amenities h4').text(allamen);
    });

    // Code to handle the filter when the button is clicked
    $('button').on('click', function () {
        // Get the list of checked amenities
        var checkedAmenities = $('.amenities input[type=checkbox]:checked').map(function (i, e) {
            return e.parentElement.dataset.id;
        }).get();

        // Send a POST request to places_search with the list of checked amenities
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: checkedAmenities }),
            success: function (places) {
                // Clear the places section
                $('.places').html('');

                // Loop through the places and create article tags
                places.forEach(function (place) {
                    var placeHTML = '<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                        '</div>' +
                        '<div class "information">' +
                        '<div class="max_guest">' + place.max_guest + ' Guest' +
                        (place.max_guest !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_rooms">' + place.number_rooms + ' Bedroom' +
                        (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' +
                        (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                        '</div>' +
                        '<div class="description">' + place.description + '</div>' +
                        '</article>';
                    $('.places').append(placeHTML);
                });
            }
        });
    });
});
