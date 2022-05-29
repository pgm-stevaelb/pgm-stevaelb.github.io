/*
		Topic: Scroll to top on page
		Author: Steven Aelbrecht
		Modified: 2021-11-25
*/

const btnToTop = document.getElementById('to-top');
const bodyElement = document.documentElement;

let scrollPosition = bodyElement.scrollHeight - bodyElement.clientHeight;
// scrollHeight gives the height of an element, including the part not visible due to overflow.
// clientHeight gives the inner height of an element in pixels, which is the height of the visible part.
// If we subtract scrollHeight by clientHeight, we get the total amount of pixels that we can scroll:

function hideAndShowScrollButton() {
	if ((bodyElement.scrollTop / scrollPosition ) > 0.05 ) {
    btnToTop.classList.add("btn--visible");
  } else {
    btnToTop.classList.remove("btn--visible");
  }
};

document.addEventListener('scroll', hideAndShowScrollButton);