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

function handleEmailClick() {
  window.alert("email: lies@mail.com\n没事别联系,有事最好也别联系");
}
