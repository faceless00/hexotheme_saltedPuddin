let anchors;
let titles;
let cur_anchor = 0;
let cur_title = 1;

const deactiveProps = {
  fontSize: "1em",
  opacity: ".8",
  color: "#f5f5f7",
};
const activeProps = {
  fontSize: "1.2em",
  opacity: "1",
  color: "#bca7d7cf",
};

window.onload = function () {
  anchors = document.getElementsByClassName("anchor-link");
  titles = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
};

function activeAnchor(ele) {
  ele.style.setProperty("font-size", activeProps.fontSize);
  ele.style.setProperty("opacity", activeProps.opacity);
  ele.style.setProperty("color", activeProps.color);
}
function deactiveAnchor(ele) {
  ele.style.removeProperty("font-size"); //必须是removeProperty而不是用setProps重置值，后者会覆盖原来的css导致原css相关属性失效
  ele.style.removeProperty("opacity");
  ele.style.removeProperty("color");
}

function onScroll() {
  //   console.log("height:", window.scrollY);
  if (titles && anchors) {
    if (
      document.documentElement.scrollTop + //如果滚动到底还是不能触发最后一个anchor,再滚动的时候就触发
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      if (cur_anchor <= anchors.length - 2) {
        const preAnchor = cur_anchor;
        cur_anchor = anchors.length - 1;
        cur_title = titles.length - 1;
        deactiveAnchor(anchors[preAnchor]);
        activeAnchor(anchors[cur_anchor]);
      }
    } else if (
      // scroll_down 窗口下滑
      window.scrollY >= titles[cur_title].offsetTop &&
      cur_title < titles.length //避免最后一个标题之后仍然触发
    ) {
      const preAnchor = cur_anchor;
      while (
        cur_title <= titles.length - 2 &&
        window.scrollY >= titles[cur_title + 1].offsetTop
      ) {
        cur_title++;
        cur_anchor++;
      }
      if (preAnchor >= 0) deactiveAnchor(anchors[preAnchor]); //鉴于会跳段，所以用preAnchor记录上一个锚点
      activeAnchor(anchors[cur_anchor]);
    } else if (
      // scroll_up 窗口上滑
      cur_title >= 2 &&
      window.scrollY <=
        titles[cur_title - 1].offsetTop + titles[cur_title - 1].offsetHeight
    ) {
      const preAnchor = cur_anchor;
      while (
        cur_title >= 2 &&
        window.scrollY <=
          titles[cur_title - 2].offsetTop + titles[cur_title - 2].offsetHeight
      ) {
        //判断待激活标题的上一个标题是否位于窗口之上，如果位于，说明跳段，那么移动anchor到正确位置
        cur_anchor--;
        cur_title--;
      } //跳出循环时,cur_anchor-1是待激活标题
      if (preAnchor >= 0 && preAnchor < anchors.length)
        deactiveAnchor(anchors[preAnchor]);
      activeAnchor(anchors[--cur_anchor]);
      cur_title--;
    }
  }
}

window.onscroll = onScroll;
