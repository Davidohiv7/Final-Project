exports.mailInStock = function (name, lastName, productName, productImage) {
  return (
    `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                body {
                    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                    text-align: center;
                }
                .container {
                    position: relative;
                    margin: -10px auto;
                    background-color: #EEEBDD;
                    border-radius: 0.5rem;
                    width: 95%;
                    text-align: center;
                    max-width: 800px;
                    padding: 1rem;
                }
                .page {
                    position:relative;
                    transform: translateX(0%);
                    text-align: center; 
                    background-color: #fff;
                    border-radius: 0.5rem;
                    margin: 1rem;
                    width: 90%;
                    height: 90%;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    padding: 1rem;
                }
                .titleContainer {
                    display: block;
                    margin-top: 1.5rem;
                    text-align: center;
                    margin-top: 1rem;
                }
    
                .titleContainer > span{
                    display: inline-block;
                    color: #FA314A;
                    font-size: 2rem;
                    margin-top: 1rem;
                    vertical-align: top;
                }
                .titleContainer img{
                    height: 50px;
                    width: 50px;
                }
    
                .product-icon-container {
                    position:relative;
                    width: 100%;
                    text-align: center;
                }
    
                .product-icon {
                    display: inline-block;
                    margin-top: 1rem;
                    width: 200px;
                    height: 200px;
                    margin: 1.5rem;
                    border-radius: 50%;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    background-image: url(${productImage});
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
    
                .product-title {
                    display: block;
                    width: 100%;
                    text-align: center;
                    margin-top: 2rem;
                    margin-bottom: 3rem;
                }
    
                .product-title span{
                    font-size: 2rem;
                    font-weight: 600;
                    text-align: center;
                    padding: 0.7rem;
                }
    
                .content {
                    margin-left: 1rem;
                    text-decoration: none;
                    display: inline-block;
                    width: 90%;
                    text-align: justify;
                    font-size: 1.2rem;
                }
    
                .content span{
                    font-size: 1.3rem;
                }
    
                .link-container {
                    margin-top: 3rem;
                    margin-bottom: 2rem;
                }
    
                .link {
                    text-decoration: none;
                    background-color: #FA314A;
                    border-radius: 0.5rem;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                    padding: 0.7rem;
                    margin: 0rem 0rem 2rem 0rem;
                }
    
                .link:hover {
                    background-color: #da0019;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.8) 0px 1px 3px -1px;
                }
    
                .link span{
                    color: #fff;
                    font-size: 18px;
                }
    
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='page'>
    
                    <div class='titleContainer'>
                        <img class="celebration-icon" src="https://img.icons8.com/pastel-glyph/2x/fa314a/onion--v2.png" alt="celebration-icon">
                        <span>Onion food</span>
                    </div>
                    
                    <div class="product-icon-container">
                        <div class="product-icon"></div>
                    </div>
    
                    
                    <div class='product-title'>
                        <span>${name}, we have good news!</span>
                    </div>
    
                    <div class='content'>
                        <span class='content'>
                            The product <strong>${productName}</strong>, that you previously added to your wishlist, <strong>has stock again</strong>. 
                            Go to our catalogue or your wishlit and buy it, you will no regret it!.
                        </span>
                    </div>
                    
                    <div class='link-container'>
                        <a class='link' href="${FRONT_URL}/">
                            <span>Check products</span>
                        </a>
                    </div>
                
                </div>
            </div>
        </body>
    </html>
    `
    )
}

exports.mailSignUp = function (name, lastName, email) {
    return (`
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                            body {
                  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                  text-align: center;
                }
                .container {
                  position: relative;
                  margin: -10px auto;
                  background-color: #EEEBDD;
                  border-radius: 0.5rem;
                  width: 95%;
                  text-align: center;
                  max-width: 800px;
                  padding: 1rem;
                }
                .page {
                  position:relative;
                  transform: translateX(0%);
                  text-align: center; 
                  background-color: #fff;
                  border-radius: 0.5rem;
                  margin: 1rem;
                  width: 90%;
                  height: 90%;
                  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                  padding: 1rem;
                }
                .titleContainer {
                  display: block;
                  margin-top: 1.5rem;
                  text-align: center;
                  margin-top: 1rem;
                }
    
                .titleContainer > span{
                  display: inline-block;
                  color: #FA314A;
                  font-size: 2rem;
                  margin-top: 1rem;
                  vertical-align: top;
                }
                .titleContainer img{
                  height: 50px;
                  width: 50px;
                }
    
                .celebration-icon {
                    width: 200px;
                }
    
                .welcome-title {
                  display: block;
                  width: 100%;
                  text-align: center;
                  margin-top: 1.5rem;
                  margin-bottom: 1.5rem;
                }
    
                .welcome-title span{
                  font-size: 2rem;
                  font-weight: 600;
                  text-align: center;
                  padding: 0.7rem;
                }
    
                .content {
                    text-decoration: none;
                    display: inline-block;
                    width: 90%;
                    text-align: justify;
                    font-size: 1.2rem;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                }
    
                .content span{
                  font-size: 1.5rem;
                }
    
    
                .link-container {
                    margin-top: 3rem;
                    margin-bottom: 1rem;
                }
    
                .link {
                    text-decoration: none;
                    background-color: #FA314A;
                    border-radius: 0.5rem;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                    padding: 0.7rem;
                    margin: 0rem 2rem 2.5rem 2rem;
                }
    
                .link:hover {
                    background-color: #da0019;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.8) 0px 1px 3px -1px;
                }
    
                .link span{
                    text-align: justify;
                    font-size: 1.4rem;
                    color: #fff;
                }
    
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='page'>
    
                    <div class='titleContainer'>
                        <img class="celebration-icon" src="https://img.icons8.com/pastel-glyph/2x/fa314a/onion--v2.png" alt="celebration-icon">
                        <span>Onion food</span>
                    </div>
    
                    <img class="celebration-icMon" src="https://www.freeiconspng.com/thumbs/celebration-icon-png/celebration-icon-png-9.png" alt="celebration-icon">
    
                    <div class='welcome-title'>
                        <span>Welcome aboard, ${name}</span>
                    </div>
    
                    <div class='content'>
                        <span>
                            Congratulations on taking the first step on getting amazing products for your business. Your account was succesfully created 
                            using the email: <strong>${email}</strong>. Let's go to our home and check all our products into our catalogue, we'll be waiting for you.
                        </span>
                      </div>
    
                    
    
                    <div class='link-container'>
                        <a class='link' href="${FRONT_URL}/">
                            <span>Check catalogue</span>
                        </a>
                    </div>
                    
                </div>
            </div>
        </body>
    </html>
    `
  )
};

exports.mailBuy = function (name, order, cart) {
    return (`
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                body {
                  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                  text-align: center;
                }
                .container {
                  position: relative;
                  margin: -10px auto;
                  background-color: #EEEBDD;
                  border-radius: 0.5rem;
                  width: 95%;
                  text-align: center;
                  max-width: 800px;
                  padding: 1rem;
                }
                .page {
                  position:relative;
                  transform: translateX(0%);
                  text-align: center; 
                  background-color: #fff;
                  border-radius: 0.5rem;
                  margin: 1rem;
                  width: 90%;
                  height: 90%;
                  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                  padding: 1rem;
                }
                .titleContainer {
                  display: block;
                  margin-top: 1.5rem;
                  text-align: center;
                  margin-top: 1rem;
                }
    
                .titleContainer > span{
                  display: inline-block;
                  color: #FA314A;
                  font-size: 2rem;
                  margin-top: 1rem;
                  vertical-align: top;
                }
    
                .titleContainer img{
                  height: 50px;
                  width: 50px;
                }
    
                .shop-icon {
                    width: 200px;
                    margin: 2rem;
                }
    
                .shop-title {
                  display: block;
                  width: 100%;
                  text-align: center;
                }
    
                .shop-title span{
                  font-size: 2rem;
                  text-align: center;
                  padding: 0.7rem;
                }
    
                .order-summary-title{
                    width: 100%;
                    margin-top: 2rem;
                    text-align: left;
                }
    
                .order-summary-title div{
                    margin-left: 2rem;
                }
    
                .order-summary-title span{
                    color: #FA314A;
                    font-size: 1.2rem;
                }
    
                .divider-solid {
                    background-color: #FA314A;
                    color: #FA314A;
                    width: 90%;
                    margin: 10px 0px;
                    border: 0;
                    height: 2px;
                }
    
                .order-summary{
                    width: 100%;
                    text-align: left;
                }
    
                .order-summary > div{
                    margin-left: 2rem;
                    width: 86%;
                }
    
                .order-summary span{
                    font-weight: 500;
                    margin: 1rem 0px;
                    font-size: 20px;
                }
    
                .order-summary-payment{
                    width: 100%;
                    margin-bottom: 1rem;
                }
    
                .order-items{
                    width: 100%;
                }
    
                .order-items ul{
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                }
    
                .order-items li{
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #b4b3b3;
                }
    
                .item-text{
                    font-size: 16px!important;
                }
    
                .item-text2{
                    font-size: 14px!important;
                    font-style: italic;
                    padding-left: 3rem;
                }
    
                .item-img{
                    height: 25px;
                    width: 25px;
                    border-radius: 50%;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                }
    
                .order-items li:before{
                    content: "-";
                    margin-right: 1rem;
                }
    
                .total {
                    width: 100%;
                    text-align: right;
                }
    
                .final-divider{
                    width: 100%;
                    margin-bottom: 2rem;
                }
    
                .final-divider > hr{
                    width: 100%;
                }
    
                .link {
                    text-decoration: none;
                    background-color: #FA314A;
                    border-radius: 0.5rem;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                    padding: 0.7rem;
                    margin: 0rem 0rem 2rem 0rem;
                }
    
                .link:hover {
                    background-color: #da0019;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.8) 0px 1px 3px -1px;
                }
    
                .link span{
                    color: #fff;
                    font-size: 18px;
                }
    
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='page'>
    
                    <div class='titleContainer'>
                        <img class="celebration-icon" src="https://img.icons8.com/pastel-glyph/2x/fa314a/onion--v2.png" alt="celebration-icon">
                        <span>Onion food</span>
                    </div>
    
                    <img class="shop-icon" src="https://banner.uclipart.com/20200111/lwi/shopping-store-food-line.png" alt="shop-icon">
    
                    <div class='shop-title'>
                        <h1>Thanks for your order, ${name}!</h1>
                    </div>
    
                    <div class="order-summary-title">
                        <div>
                            <span >Order summary:</span>
                            <hr class="divider-solid">
                        </div>
                    </div>
                    
                    <div class="order-summary">
    
                        <div>
                            <div class="order-summary-payment">
                                <span >Paymenth method: ${order.paymentMethod}</span>
                            </div>
                            
                            <div class="order-items">
                                <span >Items: </span>
                                <ul>
                                    ${cart.map(product => {
                                        return (
                                            `<li>
                                                <img class="item-img" src=${product.Images[0].url} alt=${product.name}>
                                                <span class="item-text">${product.name} 
                                                    <br/> <span class="item-text2">Quantity: ${product.quantity} - Price: ${product.price}</span> </span>
                                            </li>
                                            `
                                        )
                                    }).join(' ')}
                                </ul>
                            </div>
        
                            <div class="total">
                                <span >Total: ${order.total}</span>
                            </div>
        
                        </div>
    
                        <div class="final-divider">
                            <hr class="divider-solid">
                        </div>
    
                    </div>
                    
                    <a class='link' href="${FRONT_URL}/">
                        <span>Home</span>
                    </a>
    
                </div>
            </div>
        </body>
    </html>
    `
        )
    };

exports.mailDispatched = function (name, lastName, order) {
    return (
        `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    body {
                      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                      text-align: center;
                    }
                    .container {
                      position: relative;
                      margin: -10px auto;
                      background-color: #EEEBDD;
                      border-radius: 0.5rem;
                      width: 95%;
                      text-align: center;
                      max-width: 800px;
                      padding: 1rem;
                    }
                    .page {
                      position:relative;
                      transform: translateX(0%);
                      text-align: center; 
                      background-color: #fff;
                      border-radius: 0.5rem;
                      margin: 1rem;
                      width: 90%;
                      height: 90%;
                      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                      padding: 1rem;
                    }
                    .titleContainer {
                      display: block;
                      margin-top: 1.5rem;
                      text-align: center;
                      margin-top: 1rem;
                    }
        
                    .titleContainer > span{
                      display: inline-block;
                      color: #FA314A;
                      font-size: 2rem;
                      margin-top: 1rem;
                      vertical-align: top;
                    }
                    .titleContainer img{
                      height: 50px;
                      width: 50px;
                    }
        
                    .dispatch-icon {
                        width: 250px;
                        margin: 1.5rem;
                    }
        
                    .dispatch-title {
                      display: block;
                      width: 100%;
                      text-align: center;
                      margin-top: 1.5rem;
                      margin-bottom: 1.5rem;
                    }
        
                    .dispatch-title span{
                      font-size: 2rem;
                      text-align: center;
                      padding: 0.7rem;
                    }
        
                    .content {
                        text-decoration: none;
                        display: inline-block;
                        width: 90%;
                        text-align: justify;
                        font-size: 1.2rem;
                        margin-top: 1rem;
                    }
        
                    .content2 {
                        text-decoration: none;
                        display: inline-block;
                        width: 90%;
                        text-align: justify;
                        font-size: 1.2rem;
                        margin-top: 1rem;
                    }
        
                    .address{
                        width: 100%;
                        text-align: left;
                    }
        
                    .address ul{
                        list-style: none;
                        margin-left: 4rem;
                        padding-left: 0;
                        font-size: 1.2rem;
                    }
        
                    .address li{
                        padding-bottom: 0.5rem;
                    }
        
                    li:before{
                        content: "-";
                        margin-right: 1rem;
                    }
        
                    .link-container {
                        margin-top: 3rem;
                        margin-bottom: 1rem;
                    }
        
                    .link {
                        text-decoration: none;
                        background-color: #FA314A;
                        border-radius: 0.5rem;
                        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                        padding: 0.7rem;
                        margin: 0rem 0rem 2rem 0rem;
                    }
        
                    .link:hover {
                        background-color: #da0019;
                        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.8) 0px 1px 3px -1px;
                    }
        
                    .link span{
                        color: #fff;
                        font-size: 18px;
                    }
        
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='page'>
        
                        <div class='titleContainer'>
                            <img class="celebration-icon" src="https://img.icons8.com/pastel-glyph/2x/fa314a/onion--v2.png" alt="celebration-icon">
                            <span>Onion food</span>
                        </div>
        
                        <img class="dispatch-icon" src="https://360deliveryexpress.com/wp-content/uploads/2020/08/360-delivery-express-logistica-transporte-lima-9829-1024x894.png" alt="dispatch-icon">
        
                        
                        <div class='dispatch-title'>
                            <span>${name}, your order ${order.id} has been dispatched!</span>
                        </div>
        
                        <div class='content'>
                            <span >
                                The order will arrive as soon as possible to the destination you provided:
                             </span>
                        </div>
        
                        <div class='address'>
                            <ul>
                                <li>
                                    Address: ${order.street}
                                </li>
                                <li>
                                    Neighborhood: ${order.neighborhood ? order.neighborhood : 'no provided'}
                                </li>
                                <li>
                                    City: ${order.city}
                                </li>
                                <li>
                                    Zip: ${order.zip}
                                </li>
                            </ul>
                        </div>
        
                        <div class='content2'>
                            <span>
                                You can check the order details and review the products at your User's console, just click the button!
                             </span>
                        </div>
        
                        <div class='link-container'>
                            <a class='link' href="${FRONT_URL}/user">
                                <span>Check orders</span>
                            </a>
                        </div>
        
                    </div>
                </div>
            </body>
        </html>
    `
    )
};


exports.twoFAEmailMail = function (name, token) {
  return (
    `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                 body{
                  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                  text-align: center;
                }
                .container {
                  position: relative;
                  margin: -10px auto;
                  background-color: #EEEBDD;
                  border-radius: 0.5rem;
                  width: 95%;
                  text-align: center;
                  max-width: 800px;
                  padding: 1rem;
                }
                .page {
                  position:relative;
                  transform: translateX(0%);
                  text-align: center; 
                  background-color: #fff;
                  border-radius: 0.5rem;
                  margin: 1rem;
                  width: 90%;
                  height: 90%;
                  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                  padding: 1rem;
                }
                .titleContainer {
                  display: block;
                  margin-top: 1.5rem;
                  text-align: center;
                  margin-top: 1rem;
                }
    
                .titleContainer > span{
                  display: inline-block;
                  color: #FA314A;
                  font-size: 2rem;
                  margin-top: 1rem;
                  vertical-align: top;
                }
    
                .titleContainer img{
                  height: 50px;
                  width: 50px;
                }
    
                .twofa-icon {
                  width: 250px;
                  margin: 1.5rem;
                }
    
                .twofa-title {
                  display: block;
                  width: 100%;
                  text-align: center;
                }
    
                .twofa-title span{
                  font-size: 2rem;
                  text-align: center;
                  padding: 0.7rem;
                }
    
                .content {
                  text-decoration: none;
                  font-size: 1.4rem;
                  width: 75%;
                  padding: 2rem 2rem 0rem 2rem;
                }
    
                .code {
                  margin: 2rem;
                }
    
                .code span{
                  font-size: 1.5rem;
                  padding: 0.7rem;
                }
    
                .alert {
                    text-decoration: none;
                    display: inline-block;
                    width: 90%;
                    text-align: justify;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                }
    
                .alert span{
                  font-size: 1.5rem;
                }
    
                .link-container {
                  margin-bottom: 1rem;
                }
    
                .link {
                  text-decoration: none;
                  background-color: #FA314A;
                  border-radius: 0.5rem;
                  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                  padding: 0.7rem;
                }
    
                .link:hover {
                  background-color: #da0019;
                  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.8) 0px 1px 3px -1px;
                }
    
                .link span{
                  color: #fff;
                  font-size: 18px;
                }
    
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='page'>
    
                    <div class='titleContainer'>
                          <img class="celebration-icon" src="https://img.icons8.com/pastel-glyph/2x/fa314a/onion--v2.png" alt="celebration-icon">
                          <span>Onion food </span> 
                    </div>
    
                    <img class="twofa-icon" src="https://icons-for-free.com/iconfiles/png/512/lock+login+secret+secure+security+icon-1320195384693285875.png" alt="dispatch-icon">
    
                    
                    <div class='twofa-title'>
                        <span>${name}, use the following code to access to your account:</span>
                    </div>
    
                    <div class='code'>
                      <span>
                        Code: ${token}
                      </span>
                    </div>
    
                    <div class='alert'>
                      <span>
                        You must use this code in the next 1:30 minutes, otherwise,
                         please sign in again or click in the resend code button. If 
                         you didn't attempt to sign in, please contact us.
                      </span>
                    </div>
    
                    <div class='link-container'>
                      <a class='link' href="${FRONT_URL}/contact">
                        <span>Contact us!</span>
                      </a>
                    </div>
    
                </div>
            </div>
        </body>
    </html>
  `
     )
};

  
exports.messageMail = function (name, lastName, email, message) {
  return (
    `<!DOCTYPE html>
    <html>
    <head>
    <style>
    body{
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      }
    h1 {
      background-color: #CE1212;
      border-radius: 0.5rem;
      color: #1B1717;
    }
    div {
      background-color: #EEEBDD;
      border-radius: 0.5rem;
    }
    h3 {
      color: #1B1717;
    }
    footer {
      background-color: #CE1212;
      border-radius: 0.5rem;
    }
    </style>
    </head>
    <body>
      <div align='center'>
        <h1>New Message from ${name} ${lastName} - ${email}</h1>
        <form>
            <h3>Name: ${name} ${lastName} </h3>
            <h3>E-Mail: ${email} </h3>
            <p>Message: ${message} </p>
        </form>
        <footer>
          <p>Delivered by NodeMailer</p>
        </footer>
      </div>
    </body>
    </html>
`
  )
};

exports.mailResetPass = function (name, lastName, email, token) {
  return (
    `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                body {
                    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                    text-align: center;
                }
                .container {
                    position: relative;
                    margin: -10px auto;
                    background-color: #EEEBDD;
                    border-radius: 0.5rem;
                    width: 95%;
                    text-align: center;
                    max-width: 800px;
                    padding: 1rem;
                }
                .page {
                    position:relative;
                    transform: translateX(0%);
                    text-align: center; 
                    background-color: #fff;
                    border-radius: 0.5rem;
                    margin: 1rem;
                    width: 90%;
                    height: 90%;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    padding: 1rem;
                }
                .titleContainer {
                    display: block;
                    margin-top: 1.5rem;
                    text-align: center;
                    margin-top: 1rem;
                }
    
                .titleContainer > span{
                    display: inline-block;
                    color: #FA314A;
                    font-size: 2rem;
                    margin-top: 1rem;
                    vertical-align: top;
                }
                .titleContainer img{
                    height: 50px;
                    width: 50px;
                }
    
                .passRes-icon {
                  width: 250px;
                  margin: 1.5rem;
                }
    
                .passRes-title {
                  display: block;
                  width: 100%;
                  text-align: center;
                  margin-top: 2rem;
                  margin-bottom: 3rem;
                }
    
                .passRes-title span{
                  font-size: 2rem;
                  font-weight: 600;
                  text-align: center;
                  padding: 1rem;
                }
    
                .reset-button {
                  text-decoration: none;
                  background-color: #47CCAB;
                  border-radius: 0.5rem;
                  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                  padding: 0.7rem;
                  margin: 2rem 0rem 2rem 0rem;
                }
    
                .reset-button:hover {
                  background-color: #36BA99;
                  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.8) 0px 1px 3px -1px;
                }
    
                .reset-button span{
                  color: #fff;
                  font-size: 24px;
                }
    
                .alert {
                    text-decoration: none;
                    display: inline-block;
                    width: 90%;
                    text-align: justify;
                    margin-top: 3rem;
                }
    
                .alert span{
                  font-size: 1.3rem;
                  padding: 1rem;
                }
    
                .link-container {
                    margin-top: 3rem;
                    margin-bottom: 2rem;
                }
    
                .link {
                  text-decoration: none;
                  background-color: #FA314A;
                  border-radius: 0.5rem;
                  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                  padding: 0.7rem;
                  margin: 0rem 0rem 2rem 0rem;
                }
    
                .link:hover {
                  background-color: #da0019;
                  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.8) 0px 1px 3px -1px;
                }
    
                .link span{
                  color: #fff;
                  font-size: 18px;
                }
    
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='page'>
    
                    <div class='titleContainer'>
                        <img class="celebration-icon" src="https://img.icons8.com/pastel-glyph/2x/fa314a/onion--v2.png" alt="celebration-icon">
                        <span>Onion food</span>
                    </div>
    
                    <img class="passRes-icon" src="https://cdn4.iconfinder.com/data/icons/flat-design-security-set-one/24/padlock-open-green-512.png" alt="dispatch-icon">
    
                    
                    <div class='passRes-title'>
                        <span>${name}, click the following button to change your password:</span>
                    </div>
    
                    <a class='reset-button' href="${FRONT_URL}/passwordReset?token=${token}">
                      <span>Reset password</span>
                    </a>
    
                    <div class='alert'>
                      <span>
                        If your are not trying to reset your password, please contact us.
                      </span>
                    </div>
    
                    <div class='link-container'>
                      <a class='link' href="${FRONT_URL}/contact">
                        <span>Contact us!</span>
                      </a>
                    </div>
                  
                </div>
            </div>
        </body>
    </html>
    `
  )
};

exports.changePasswordMail = function (name) {
  return (
    `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                body {
                    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                    text-align: center;
                }
                .container {
                    position: relative;
                    margin: -10px auto;
                    background-color: #EEEBDD;
                    border-radius: 0.5rem;
                    width: 95%;
                    text-align: center;
                    max-width: 800px;
                    padding: 1rem;
                }
                .page {
                    position:relative;
                    transform: translateX(0%);
                    text-align: center; 
                    background-color: #fff;
                    border-radius: 0.5rem;
                    margin: 1rem;
                    width: 90%;
                    height: 90%;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    padding: 1rem;
                }
                .titleContainer {
                  display: block;
                  margin-top: 1.5rem;
                  text-align: center;
                  margin-top: 1rem;
                }
    
                .titleContainer > span{
                  display: inline-block;
                  color: #FA314A;
                  font-size: 2rem;
                  margin-top: 1rem;
                  vertical-align: top;
                }
                .titleContainer img{
                  height: 50px;
                  width: 50px;
                }
    
                .pass-change-icon {
                  width: 350px;
                }
    
                .pass-change-title {
                  display: block;
                  width: 100%;
                  text-align: center;
                  margin-top: 2rem;
                  margin-bottom: 2rem;
                }
    
                .pass-change-title span{
                  font-size: 2rem;
                  font-weight: 600;
                  text-align: center;
                  padding: 1rem;
                }
    
                .alert {
                  text-decoration: none;
                  display: inline-block;
                  width: 90%;
                  text-align: justify;
                  margin-top: 1rem;
                }
    
                .alert span{
                  font-size: 1.3rem;
                  padding: 1rem;
                }
    
                .link-container {
                  margin-top: 3rem;
                  margin-bottom: 2rem;
                }
    
                .link {
                  text-decoration: none;
                  background-color: #FA314A;
                  border-radius: 0.5rem;
                  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                  padding: 0.7rem;
                  margin: 0rem 0rem 2rem 0rem;
                }
    
                .link:hover {
                  background-color: #da0019;
                  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.8) 0px 1px 3px -1px;
                }
    
                .link span{
                  color: #fff;
                  font-size: 18px;
                }
    
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='page'>
    
                    <div class='titleContainer'>
                        <img class="celebration-icon" src="https://img.icons8.com/pastel-glyph/2x/fa314a/onion--v2.png" alt="celebration-icon">
                        <span>Onion food</span>
                    </div>
    
                    <img class="pass-change-icon" src="https://uploads-ssl.webflow.com/57261d5a78d342c0529dc2eb/5c42391cff0f508ac22b1a95_Reset-Password.png" alt="dispatch-icon">
    
                    
                    <div class='pass-change-title'>
                        <span>${name}, your password was successfully updated</span>
                    </div>
    
                    <div class='alert'>
                      <span>
                        If it wasn't you, please contact us as soon as possible.
                      </span>
                    </div>
    
                    <div class='link-container'>
                      <a class='link' href="${FRONT_URL}/contact">
                        <span>Contact us!</span>
                      </a>
                    </div>
    
                </div>
            </div>
        </body>
    </html>
  `
  )
};