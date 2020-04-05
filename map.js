const template = location => {
  return`
  <h2>${location.title}</h2>
  <p>${location.body}</p>
  `

}

let animating = false;
const zoom = (val) => {
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

// This is all the scroll code
let startX, startY, scrollLeft, scrollTop
let isDown = false

const $mapcontainer = $('#mapcontainer');
$mapcontainer.on('mousedown', e => {
  isDown = true
  startX = e.pageX - $mapcontainer.offset().left;
  startY = e.pageY - $mapcontainer.offset().top;
  scrollLeft = $mapcontainer.scrollLeft()
  scrollTop = $mapcontainer.scrollTop()
})
$mapcontainer.on('mouseup', e => {
  isDown = false
})

$mapcontainer.on("mousemove", e => {
  if(isDown){
    e.preventDefault();
    const x = e.pageX - $mapcontainer.offset().left;
    const y = e.pageY - $mapcontainer.offset().top
    const walkX = x - startX;
    const walkY = y - startY

    $mapcontainer.scrollTop(scrollTop - walkY)
    $mapcontainer.scrollLeft(scrollLeft - walkX)
  }
});