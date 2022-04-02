var reverseFlag = false;
function reverseIcon() {
  const mainIcon = document.getElementById("mainIcon");
  if (mainIcon) {
    if (!reverseFlag) {
      mainIcon.style.setProperty(
        "transform",
        "rotateX(180deg) rotateY(180deg)"
      );
      reverseFlag = true;
    } else {
      mainIcon.style.removeProperty("transform");
      reverseFlag = false;
    }
  } else {
    console.log("wrong!!");
  }
}
