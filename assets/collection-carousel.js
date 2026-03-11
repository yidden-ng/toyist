
const collectionHolder = document.querySelector('.collection-holder')
const scrollContainer = document.querySelector('.scroll-container')
const textLeft = document.querySelector('.text_left_wrapper');
const highlight = document.querySelectorAll('.highlight_text')
let enterY = null;

let trigger = 300;


function updateHeight() {
  if (window.innerWidth >= 768){
    const maxDistance = collectionHolder.scrollWidth - window.innerWidth;
    scrollContainer.style.height = `${maxDistance + window.innerHeight + 500}px`
  }
}

updateHeight();

window.addEventListener('scroll', () => { 
  if (window.innerWidth < 768) return;
  updateHighlights(); 
  const rect = scrollContainer.getBoundingClientRect();
   if (rect.top <= 0 && enterY === null){
        enterY = window.scrollY;
       console.log('EnterY:', enterY)

    }
    if (enterY !== null){
        const distance = window.scrollY - enterY;
        console.log("Distance:", distance);
        const maxDistance = collectionHolder.scrollWidth - window.innerWidth + 500
        const clamped = Math.min(distance, maxDistance);

      //progress bar
        const progress = clamped / maxDistance;
        document.querySelector('.wrap_content').style.setProperty('--progress', (progress * 100) + '%')

        if (distance <= 0){
          console.log('stop ainmation')
          
        } else {
          collectionHolder.style.transform = `translateX(${-clamped}px)`
        }

        if (distance >= 50) {
          // apply animation
          textLeft.classList.add('fade-left') 
        } else {
          textLeft.classList.remove('fade-left') 
        }


    }
})


const items = document.querySelectorAll('.collection-title-image');

function updateHighlights() {
  const containerRect = collectionHolder.getBoundingClientRect();

  items.forEach(item => {
    const rect = item.getBoundingClientRect();

    // Calculate how much of the item is visible horizontally
    const visibleWidth = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
    const totalWidth = rect.width;
    const visiblePercent = visibleWidth / totalWidth;

    const highlight = item.querySelector('.highlight_text');

    if (visiblePercent >= 0.9) {
      highlight.classList.add('visible');
    } else {
      highlight.classList.remove('visible');
    }
  });
}
