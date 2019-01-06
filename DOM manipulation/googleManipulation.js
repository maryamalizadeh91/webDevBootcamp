var logo = document.querySelector("#hplogo");
logo.setAttribute(
  "srcset",
  "https://www.purina.com.au/-/media/E6EDBEC8D61240E384E78A11E20645D2.ashx"
);
logo.style.width = "200px";
logo.style.height = "100px";

logo.style.border = "2px solid purple";

var links = document.getElementsByTagName("a");

for (var i = 0 ; i < links.length; i++)
{
    links[i].style.border = "1px dashed purple";
    links[i].style.color = "orange";
}

for (var i = 0 ; i < links.length; i++)
{
    console.log(links[i].getAttribute("href"));
}

for (var i = 0 ; i < links.length; i++)
{
    links[i].setAttribute("href", "http://bing.com");
    links[i].setAttribute("target", "_blank");
}
