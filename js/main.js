'use strict';

function isTouchDevice() {
    return 'ontouchstart' in window        // works on most browsers
        || navigator.maxTouchPoints;       // works on IE10/11 and Surface
}

var element = document.getElementById("container");
var content = document.getElementById("content");

var result = 0;

var startPos = 0;
var currentContentPos = 0;

if (isTouchDevice()) {
    document.addEventListener("touchstart", setTouchStartPos, true);
    document.addEventListener("touchmove", slideTouch, true);
    document.addEventListener("touchend", onTouchEnd, true);
    document.addEventListener("touchcancel", onTouchEnd, true);
} else {
    element.addEventListener("mousedown", onClick, false);
    element.addEventListener("mouseup", disableSliderListener, false);
    //element.addEventListener("mousemove", slide, false);
    element.addEventListener("mouseleave", disableSliderListener, false);
}

function setTouchStartPos(e) {
    startPos = e.changedTouches[0].pageX; //get first touch pos
}

function onTouchEnd(e) {
    currentContentPos = result; // secure current content position
}

function slideTouch(e) {
    move(e.changedTouches[0].pageX);
}

function slideMouse(e) {
    move(e.pageX);
}

function onClick(e) {
    startPos = e.pageX; // get click pos
    document.onmousemove = slideMouse; // activate slide on mouse move
}

function disableSliderListener(e) {
    document.onmousemove = undefined; // disable slide on mouse move
    currentContentPos = result; // secure current content position
}

function move(posChange) {
    //calculate difference between start position and current position
    result = currentContentPos + (posChange - startPos);
    content.style.transform = 'translate3d(' + result + 'px,0px,0px)';
}