$(document).ready(() => {
const template = location => {
  return`
  <h2>${location.title}</h2>
  <p>${location.body}</p>
  `

}
const coordinates = [] 
$('.mapbutton').each(function() {
  coordinates.push(this.coords.split(','))
})
console.log(coordinates)
const $map = $('#tmap');
const mapWidth = $map.width()
const mapHeight = $map.height()
let zoomSize = 1;
let animating = false;
const zoom = (direction) => {
  //false is out, true is in
  if(!animating){
    direction ? zoomSize += .25 : Math.max(1,zoomSize - .25);
    console.log(zoomSize)
  animating = true
  $map.width(mapWidth * zoomSize)
  $map.height(mapHeight * zoomSize)
  $('.mapbutton').each(function(i) {
    console.log({coords:coordinates[i]})
    coords = coordinates[i].map(coord => coord * zoomSize)  
    this.coords = `${coords[0]},${coords[1]},${coords[2]}`
    console.log(this.coords)
  })}
}
$('#tmap').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
  animating = false
})

$('#zoomout').on('click', e => {
  zoom(false)
})
$('#zoomin').on('click', e => {
  zoom(true)
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
})})