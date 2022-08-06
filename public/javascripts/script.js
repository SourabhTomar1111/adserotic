var mediaData = [];
var advertiserData;
var publisherData;
var pageData;
const images = document.querySelectorAll(".data");
const advertiser = document.querySelectorAll(".advertiser");
const publisher = document.querySelectorAll(".publisher");
const media = document.querySelectorAll(".media");
const page = document.querySelectorAll(".page");

advertiser.forEach((adv) => {
  advertiserData = adv.getAttribute("value");
});
publisher.forEach((pub) => {
  publisherData = pub.getAttribute("value");
});
media.forEach((med) => {
  mediaData.push(med.getAttribute("value"));
});

page.forEach((pag) => {
  pageData = pag.getAttribute("value");
});

//=============================== Show widgets =========================================
let i = 0;

var intervalTime = 1000;

const inter = async () => {
  images.forEach((img, i) => {
    img.style.display = "none";
  });
  if (i == images.length) {
    i = 0;
    update();
  }
  images[i].style.display = "block";
  i++;
};

//=================================== Stop Interval and remove widgets =======================
function removeData() {
  clearInterval(intervalID);
  var remove_div = document.getElementById("remove");
  remove_div.remove();
}
const intervalID = setInterval(inter, intervalTime);

//=================================== update count ========================================
const update = () => {
  $.ajax({
    type: "POST",
    url: "/widgets/count",
    dataType: "json",
    data: {
      advertiserData,
      publisherData,
      mediaData,
      pageData,
    },
  });
};
