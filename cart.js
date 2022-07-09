	let addToCartBtn = document.getElementsByClassName("addToCart");
	let cartContainer = document.getElementById("cart-container");
	let cartCol = document.getElementById("cart-col")

	let product;
	let cartObj = {
		items: [],
		total: 0

	}


//first lets addd an eventListener function to all the cart buttons
for (let i = 0; i < addToCartBtn.length; i++) {
	addToCartBtn[i].addEventListener("click", function() {
		let button = addToCartBtn[i]
		cart(button);
	})
}

function cart(item) {
	//alert(item)
	let parent = item.parentElement;
	//alert(parent.innerHTML)
	let children = parent.children;
	product = children;
	//alert(product)
	/*
	for(let i= 0; i < product.length; i++)
		{
			alert(product[i].innerHTML)
		}
		*/
	buildcartObj(product)
}


function buildcartObj(product) {
 //show  and hide notification 

 setTimeout(function(){
document.getElementById("notification").style.display= "block"

setTimeout(function(){
	document.getElementById("notification").style.display= "none"

},1000)
 },1000)


	let productObj = {};

	for (let i = 0; i < product.length; i++) {
		productObj.productName = product[0].innerHTML;
		productObj.productPrice = product[4].innerHTML;
		productObj.productImg = product[1].src;
		//assign random number as productId
		productObj.productId = Math.floor(Math.random() * 101);
	}

	//console.log(cartObj.items);
	cartObj.items.push(productObj);
	
	let result = cartObj.items.filter((item, index) => {
		return cartObj.items.findIndex((x) => {
			return x.productName == item.productName && item.productPrice == item.productPrice;
		}) == index;	
		
	});

	cartObj.items = result;
	console.log(cartObj.items.length)
	buildDOM();
} //buildcartObj()



function buildDOM() {
	let cartItems = cartObj.items;


	while (cartCol.children.length) {
		cartCol.removeChild(cartCol.children[0]);
	}


	for (let i = 0; i < cartItems.length; i++) {
		let div = document.createElement("div");
		div.setAttribute("class", "col-sm-8 d-flex justify-content-between cart-div");
		let productTitle = document.createElement("h5");
		productTitle.innerHTML = cartItems[i].productName;
		let image = document.createElement('img');
		image.src = cartItems[i].productImg;
		image.class = "cart-image"
		image.style.width = "20%";
		let productPrice = document.createElement("p")
		productPrice.innerHTML = cartItems[i].productPrice;
		let productId = document.createElement("p");
		productId.innerHTML = cartItems[i].productId;

		let removeButton = document.createElement("button");
		removeButton.setAttribute("class", "btn btn-danger");
		removeButton.innerHTML = "remove";
		removeButton.setAttribute("onclick", "remove(this)")


		cartContainer.style.display = "block"

		div.appendChild(productTitle);
		div.appendChild(image);
		div.appendChild(productPrice);
	    div.appendChild(productId)
		div.appendChild(removeButton);


		cartCol.appendChild(div)
	} // end of for loop


	total();

} //end of fxn



function remove(button) {
	console.log(button)
	console.log(button.parentElement)  	
	let itemId = parseInt(button.previousElementSibling.innerHTML);
	console.log(`${itemId} this is the ID `);   
	//remove parent of button
	for (let i = 0; i < cartObj.items.length; i++) {
		if (cartObj.items[i].productId === itemId) {
			cartObj.items.splice(i, 1)
		}
	} //end of for
   buildDOM();
    total();
} //end of function remove


function total() {    
	let sum = 0; 
	cartObj.items.forEach(function(item) {
		let itemPrice = parseFloat(item.productPrice.substring(1));
		//alert(item.productPrice.substring(1))
		sum += itemPrice;
	})
	cartObj.total = sum;
	document.getElementById("totalP").innerHTML = "Cart total: $"+ sum + "   ";
	paypal();	
} //end of total

function paypal(){
	//create only one DOM el
	if(cartObj.total > 0) {
	let paypalButton = document.createElement("button");
	paypalButton.setAttribute("class", "btn btn-primary btn-lg")
	let anchor= document.createElement("a");
	anchor.id = "anchor"
	anchor.href= "paypal.html"
	anchor.innerHTML = "Paypal"
	paypalButton.appendChild(anchor)
	document.getElementById("totalP").appendChild(paypalButton)
sessionStorage.setItem("paypalTotal", JSON.stringify(cartObj.total));
	}
}//end of paypal
