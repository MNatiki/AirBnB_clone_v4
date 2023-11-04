$( document ).ready(function (){
    $('.amenities input[type=checkbox]').on('click', function (){
      let amenityId = $('.amenities input[type=checkbox]:checked').map(function (i, e){
          return e.parentElement.dataset.id
      });
      // console.log(amenityId)
      let amenityName = $('.amenities input[type=checkbox]:checked').map(function (i, e){
          return e.parentElement.dataset.name
      });
      let allamen = '';
      let concat = ', ';
      for (let i = 0; i < amenityName.length; i++){
          if (i === amenityName.length - 1){
              concat = '';
          }
          allamen += amenityName[i] + concat
      }
      $('.amenities h4').text(allamen);
    })  
  })
$.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:5001/api/v1/status',
    success: (data) => {
        if (data.status === 'OK'){
            console.log(data.status)
            $('#api_status').addClass('available')
        } else{
            $('#api_status').removeClass('available')
        }
    }
})