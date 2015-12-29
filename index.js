var sections = Array.prototype.slice.call(document.querySelectorAll("h2[id]"));
var links = document.querySelector(".demo-links");

sections.forEach(function(header) {
  var link = document.createElement("a");
  link.href = "#" + header.id;
  link.textContent = header.textContent;
  var item = document.createElement("li");
  item.appendChild(link);
  links.appendChild(item);
});
