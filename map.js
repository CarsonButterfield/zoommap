const template = location => {
  return`
  <h2>${location.title}</h2>
  <p>${location.body}</p>
  `

}

let animating = false;
const zoom = (val,center) => {
  if(!animating){
  animating = true
  const $map = $('#tmap');
  $map.width($map.width() * val)
  $map.height($map.height() * val)

  $('.mapbutton').each(function(i) {
    let coords = this.coords.split(',')
    coords = coords.map(coord => coord * val)  
    this.coords = `${coords[0]},${coords[1]},${coords[2]}`
  })}
}
$('#tmap').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
  animating = false
})

$('#zoomout').on('click', e => {
  zoom(.75)
})
$('#zoomin').on('click', e => {
  zoom(1.25)
})
$('.mapbutton').on('click',event =>{
  if(event.target.classList.contains('mapbutton')){
    $('#modal-content').html(template(locations[event.target.dataset.id]))
    $('#modal, #backgroundbutton').show()
  }
})
$('#closemodal, #backgroundbutton').on('click', e=>{
  $('#modal, #backgroundbutton').hide()
})
zoom(.5)
//get full size of image on page for conversion to map coordinates
//compare clicked converted coordinates to center of image
//