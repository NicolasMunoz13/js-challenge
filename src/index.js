const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const tableList = document.getElementById('table_List')
const imageCard = document.getElementById('image_Card');
const productTitle = document.getElementById('product_title');
const productPrice = document.getElementById('product_price');
const main = document.getElementById('Main');
const API = 'https://api.escuelajs.co/api/v1/products';
let productsData = []


let pageSize;
let currentPage = 1;

async function renderTable(page = 1) {
  await getData()

  if (page == 1) {
    document.querySelector('#btn_prev').style.visibility = "hidden"
  } else {
    document.querySelector('#btn_prev').style.visibility = "visible"
  }

  if (page == numberOfPages()) {
    document.querySelector('#btn_next').style.visibility = "hidden"
    let text = document.createElement('h1')
    main.appendChild(text)
    text.innerHTML = "Todos los productos Obtenidos"
  } else {
    document.querySelector('#btn_next').style.visibility = "visible"
  }


  let productInfo = ""
  let image=""
  let title=""
  let price=""
  productInfo += "<tr>"
  productInfo += "<th>Title</th>"
  productInfo += "<th>Price</th>"
  productInfo += "<th>Description</th>"
  productInfo += "</tr>"
  productsData.filter((row, index) => {
    let start = (currentPage - 1) * pageSize;
    let end = currentPage * pageSize;
    if (index >= start && index < end) return true;
    if (currentPage > 1) {
      pageSize = 10
    } else {
      pageSize = 14
    }
  }).forEach(product => {
    if (product.id >= 5) {
      productInfo += "<tr>";
      productInfo += `<td>${product.title}</td>`
      productInfo += `<td>${product.price}</td>`
      productInfo += `<td>${product.description}</td>`
      productInfo += "</tr>";
    }
    if(product.id = 7){
      image = `${product.category.image}`
      title = `${product.title}`
      price = `$Precio: ${product.price}`
    }
  })
  tableList.innerHTML = productInfo;
  imageCard.src = image;
  productTitle.innerHTML = title;
  productPrice.innerHTML = price;  

}


function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable(currentPage)
  }
}

function nextPage() {
  if ((currentPage) < productsData.length) {
    currentPage++;
    renderTable(currentPage)
  }
}

function numberOfPages() {
  return Math.ceil(productsData.length / pageSize)
}

document.querySelector('#btn_prev').addEventListener('click', previousPage, false)
document.querySelector('#btn_next').addEventListener('click', nextPage, false)


async function getData() {
  const response = await fetch(API);
  const products = await response.json();
  productsData = products

}


const loadData = () => {
  renderTable()
}

const intersectionObserver = new IntersectionObserver(entries => {
  document.querySelector("body").style.height = "10000px";
  window.addEventListener("scroll", function () {
    let body = document.querySelector("body");
    let height = body.style.height;
    height = height.slice(0, -2);
    height = Number(height);
    return function () {
      if (height - window.screenY < 700) {
        height += height / 2;
      }
      body.style.height = height + "px"
    }
  })

}, {
  rootMargin: '0px 0px 100% 0px',
});


loadData()
intersectionObserver.observe($observe);
