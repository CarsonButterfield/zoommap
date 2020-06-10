$(document).ready(() => {

const $map = $('#tmap');
const mapWidth = $map.width()
const mapHeight = $map.height()
let zoomSize = .15;
let animating = false;
let modalIsOpen = false;
const template = location => {
  return`
  <h2>${location.title}</h2>
  <p>${location.body}</p>
  `

}
const checkScroll = () => {
console.log($mapcontainer.scrollLeft(), $mapcontainer.scrollTop())
}
const coordinates = [] 
$('.mapbutton').each(function() {
  coordinates.push(this.coords.split(','))
})

const animateMap = (center) => {
    const width = mapWidth * zoomSize
    const height = mapHeight * zoomSize
    
    const scrollLeft = $mapcontainer.scrollLeft() - (center[0] - ((mapWidth * zoomSize )/ 2))
    const scrollTop = $mapcontainer.scrollTop() - ( center[1] - ((mapHeight * zoomSize) / 2))
    console.log({scrollLeft,scrollTop})
    $mapcontainer.animate({scrollLeft,scrollTop},{duration:300,queue:false})
    $map.animate({width,height},{duration:300,queue:true,complete:()=>animating=false})
}

const zoom = (direction) => {
  checkScroll()
  //false is out, true is in
  if(!animating){
    console.log('meep')
    const center = [$map.width()/ 2, $map.height()/2]
    
    direction ? zoomSize += .25 : zoomSize = Math.max(.4,zoomSize - .25);
    animating = zoomSize === 1 ? false : true
    animateMap(center)
  $('.mapbutton').each(function(i) {
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
$('#closemodal').on('click', e => {
  $('#modal').hide(300)
  modalIsOpen = false
})
$('.mapbutton').on('click',event =>{
    if(modalIsOpen){
      $('#modal').hide(300, ()=> {$('#modal-content').html(template(locations[event.target.dataset.id]))})
      $('#modal').show(300)
    }
    else{
      modalIsOpen = true
      $('#modal-content').html(template(locations[event.target.dataset.id]))
      $('#modal').show(300)
    }
  
})


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
})
zoom(true)
})