document.addEventListener("DOMContentLoaded", () => {

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  const category = currentPage.split("-")[0]; 
  // men-main.html → men
  // women-detail.html → women

  const menuLinks = document.querySelectorAll(".categories a");

  menuLinks.forEach(link => {

    const linkCategory = link.getAttribute("href").split("-")[0].toLowerCase();

    if (category === linkCategory) {
      link.style.color = "black";
      link.style.fontWeight = "600";
    }

  });

});