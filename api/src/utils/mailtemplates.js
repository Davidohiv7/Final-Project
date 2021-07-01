exports.mailInStock = function (name, lastName, productName, productImage) {
  return (
    `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                 body{
                    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #EEEBDD;
                    border-radius: 0.5rem;
                    width: 95%;
                    max-width: 800px;
                }
                .page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #fff;
                    border-radius: 0.5rem;
                    margin: 1rem;
                    width: 90%;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                }
                .titleContainer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 1.5rem;
                }
    
                .titleContainer h1{
                    color: #FA314A;
                }
    
                .titleContainer img{
                    height: 50px;
                    width: 50px;
                    margin-bottom: 14px;
                }
    
                .product-icon {
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
                    width: 90%;
                }
    
                .product-title h1{
                    text-align: center;
    
                }
    
                .content {
                    text-align: justify;
                    text-decoration: none;
                    font-size: 1.4rem;
                    width: 75%;
                    padding: 2rem 2rem 2rem 2rem;
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
                        <h1>Onion food</h1>
                    </div>
    
                    <div class="product-icon"></div>
    
                    
                    <div class='product-title'>
                        <h1>${name}, we have good news!</h1>
                    </div>
    
                    <span class='content'>
                       The product <strong>${productName}</strong>, that you previously added to your wishlist, <strong>has stock again</strong>. 
                       Go to our catalogue or your wishlit and buy it, you will no regret it!.
                    </span>
                    
                    <a class='link' href="http://localhost:3000/">
                        <span>Check products</span>
                    </a>
    
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
                body{
                    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #EEEBDD;
                    border-radius: 0.5rem;
                    width: 90%;
                    max-width: 800px;
                }
                .page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #fff;
                    border-radius: 0.5rem;
                    margin: 1rem;
                    width: 80%;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                }
                .titleContainer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 1.5rem;
                }
    
                .titleContainer h1{
                    color: #FA314A;
                }
    
                .titleContainer img{
                    height: 50px;
                    width: 50px;
                    margin-bottom: 14px;
                }
    
                .celebration-icon {
                    width: 200px;
                }
    
                .content {
                    width: 75%;
                    padding: 2rem;
                    text-decoration: none;
                    font-size: 1.4rem;
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
                        <h1>Onion food</h1>
                    </div>
    
                    <img class="celebration-icMon" src="https://www.freeiconspng.com/thumbs/celebration-icon-png/celebration-icon-png-9.png" alt="celebration-icon">
    
                    <h1 class="welcomeTitle">Welcome aboard, ${name} </h1>
    
                    <p class='content'>
                        Congratulations on taking the first step on getting amazing products for your business. Your account was succesfully created 
                        using the email: <strong>davidbu7@hotmail.com</strong>. Let's go to our home and check all our products into our catalogue, we'll be waiting for you.
                    </p>
    
                    <a class='link' href="http://localhost:3000/">
                        <span>Check catalogue</span>
                    </a>
                    
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
                 body{
                    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #EEEBDD;
                    border-radius: 0.5rem;
                    width: 95%;
                    max-width: 800px;
                }
                .page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #fff;
                    border-radius: 0.5rem;
                    margin: 1rem;
                    width: 90%;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                }
                .titleContainer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 1.5rem;
                }
    
                .titleContainer h1{
                    color: #FA314A;
                }
    
                .titleContainer img{
                    height: 50px;
                    width: 50px;
                    margin-bottom: 14px;
                }
    
                .shop-icon {
                    width: 200px;
                    margin: 2rem;
                }
    
                .order-summary-title{
                    width: 80%;
                    display: flex;
                    flex-direction: column;
                    margin-top: 2rem;
                }
    
                .order-summary-title h2{
                    color: #FA314A;
                    margin: 10px 0px;
                }
    
                .divider-solid {
                    background-color: #FA314A;
                    color: #FA314A;
                    width: 90%;
                    margin: 5px 0px;
                    border: 0;
                    height: 2px;
                }
    
                .order-summary{
                    display: flex;
                    flex-direction: column;
                    width: 80%;
                    align-items: flex-start;
                    justify-content: flex-start;
                }
    
                .order-summary span{
                    font-weight: 500;
                    margin: 1rem 0px;
                    font-size: 20px;
                }
    
                .order-items{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    align-items: flex-start;
                    justify-content: flex-start;
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
                    display: flex;
                    flex-direction: column;
                    width: 90%;
                    align-items: flex-end;
                    justify-content: flex-end;
                }
    
                .final-divider{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
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
                        <h1>Onion food</h1>
                    </div>
    
                    <img class="shop-icon" src="https://banner.uclipart.com/20200111/lwi/shopping-store-food-line.png" alt="shop-icon">
    
                    <h1 class="welcomeTitle">Thanks for your order, ${name}!</h1>
    
                    <div class="order-summary-title">
                        <h2 >Order summary:</h2>
                        <hr class="divider-solid">
                    </div>
                    
                    <div class="order-summary">
    
                        <span >Paymenth method: ${order.paymentMethod}</span>
    
                        <div class="order-items">
                            <span >Items: </span>
                            <ul>
                                ${cart.map(product => {
                                    return (
                                        `<li>
                                            <img class="item-img" src=${product.Images[0].url} alt=${product.name}>
                                            <span class="item-text">${product.name} - Quantity: ${product.quantity} - Price: ${product.price}</span>
                                        </li>
                                        `
                                    )
                                }).join(' ')}
                            </ul>
                        </div>
    
                        <div class="total">
                            <span >Total: ${order.total}</span>
                        </div>
    
                        <div class="final-divider">
                            <hr class="divider-solid">
                        </div>
    
                    </div>
                    
                    <a class='link' href="http://localhost:3000/">
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
                     body{
                        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    .container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #EEEBDD;
                        border-radius: 0.5rem;
                        width: 95%;
                        max-width: 800px;
                    }
                    .page {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background-color: #fff;
                        border-radius: 0.5rem;
                        margin: 1rem;
                        width: 90%;
                        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    }
                    .titleContainer {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-top: 1.5rem;
                    }
        
                    .titleContainer h1{
                        color: #FA314A;
                    }
        
                    .titleContainer img{
                        height: 50px;
                        width: 50px;
                        margin-bottom: 14px;
                    }
        
                    .dispatch-icon {
                        width: 250px;
                        margin: 1.5rem;
                    }
        
                    .dispatch-title {
                        width: 90%;
                    }
        
                    .dispatch-title h1{
                        text-align: center;
        
                    }
        
                    .content {
                        text-decoration: none;
                        font-size: 1.4rem;
                        width: 75%;
                        padding: 2rem 2rem 0rem 2rem;
                    }
        
                    .content2 {
                        text-decoration: none;
                        font-size: 1.4rem;
                        width: 75%;
                        padding: 0rem 2rem 2rem 2rem;
                    }
        
                    .address{
                        width: 75%;
                    }
        
                    .address ul{
                        list-style: none;
                        margin-left: 0;
                        padding-left: 0;
                        font-size: 1.4rem;
                    }
        
                    .address li{
                        padding-bottom: 0.5rem;
                    }
        
                    li:before{
                        content: "-";
                        margin-right: 1rem;
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
                            <h1>Onion food</h1>
                        </div>
        
                        <img class="dispatch-icon" src="https://360deliveryexpress.com/wp-content/uploads/2020/08/360-delivery-express-logistica-transporte-lima-9829-1024x894.png" alt="dispatch-icon">
        
                        
                        <div class='dispatch-title'>
                            <h1>${name}, your order ${order.id} has been dispatched!</h1>
                        </div>
        
                        <span class='content'>
                           The order will arrive as soon as possible to the destination you provided:
                        </span>
        
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
        
                        <span class='content2'>
                            You can check the order details and review the products at your User's console, just click the button!
                         </span>
                        
                        <a class='link' href="http://localhost:3000/user">
                            <span>Check orders</span>
                        </a>
        
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
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                }
                .container {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #EEEBDD;
                  border-radius: 0.5rem;
                  width: 95%;
                  max-width: 800px;
                }
                .page {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  background-color: #fff;
                  border-radius: 0.5rem;
                  margin: 1rem;
                  width: 90%;
                  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                }
                .titleContainer {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-top: 1.5rem;
                }
    
                .titleContainer h1{
                  color: #FA314A;
                }
    
                .titleContainer img{
                  height: 50px;
                  width: 50px;
                  margin-bottom: 14px;
                }
    
                .twofa-icon {
                  width: 250px;
                  margin: 1.5rem;
                }
    
                .twofa-title {
                  width: 90%;
                }
    
                .twofa-title h1{
                  text-align: center;
                }
    
                .content {
                  text-decoration: none;
                  font-size: 1.4rem;
                  width: 75%;
                  padding: 2rem 2rem 0rem 2rem;
                }
    
                .code {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 2rem;
                }
    
                .code span{
                  font-size: 1.5rem;
                }
    
                .alert {
                    text-decoration: none;
                    font-size: 1.4rem;
                    width: 75%;
                    padding: 0rem 2rem 2rem 2rem;
                    text-align: justify ;
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
                        <h1>Onion food</h1>
                    </div>
    
                    <img class="twofa-icon" src="https://icons-for-free.com/iconfiles/png/512/lock+login+secret+secure+security+icon-1320195384693285875.png" alt="dispatch-icon">
    
                    
                    <div class='twofa-title'>
                        <h1>${name}, use the following code to access to your account:</h1>
                    </div>
    
                    <div class='code'>
                      <span>
                        Code: ${token}
                      </span>
                    </div>
    
                    <div class='alert'>
                      <span>
                        You must use this code in the next 1:30 minutes, otherwise, please sign in again or click in the resend code button.
                        If you didn't attempt to sign in, please contact us.
                      </span>
                    </div>
    
                    <a class='link' href="http://localhost:3000/contact">
                      <span>Contact us!</span>
                    </a>
    
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
                 body{
                  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                }
                .container {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #EEEBDD;
                  border-radius: 0.5rem;
                  width: 95%;
                  max-width: 800px;
                }
                .page {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  background-color: #fff;
                  border-radius: 0.5rem;
                  margin: 1rem;
                  width: 90%;
                  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                }
                .titleContainer {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-top: 1.5rem;
                }
    
                .titleContainer h1{
                  color: #FA314A;
                }
    
                .titleContainer img{
                  height: 50px;
                  width: 50px;
                  margin-bottom: 14px;
                }
    
                .passRes-icon {
                  width: 250px;
                  margin: 1.5rem;
                }
    
                .passRes-title {
                  width: 90%;
                }
    
                .passRes-title h1{
                  text-align: center;
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
                    font-size: 1.4rem;
                    width: 75%;
                    padding: 2rem 2rem 2rem 2rem;
                    text-align: justify ;
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
                        <h1>Onion food</h1>
                    </div>
    
                    <img class="passRes-icon" src="https://cdn4.iconfinder.com/data/icons/flat-design-security-set-one/24/padlock-open-green-512.png" alt="dispatch-icon">
    
                    
                    <div class='passRes-title'>
                        <h1>${name}, click the following button to change your password:</h1>
                    </div>
    
                    <a class='reset-button' href="http://localhost:3000/passwordReset?token=${token}">
                      <span>Reset password</span>
                    </a>
    
                    <div class='alert'>
                      <span>
                        If your are not trying to reset your password, please contact us.
                      </span>
                    </div>
    
                    <a class='link' href="http://localhost:3000/contact">
                      <span>Contact us!</span>
                    </a>
    
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
                 body{
                  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                }
                .container {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #EEEBDD;
                  border-radius: 0.5rem;
                  width: 95%;
                  max-width: 800px;
                }
                .page {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  background-color: #fff;
                  border-radius: 0.5rem;
                  margin: 1rem;
                  width: 90%;
                  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                }
                .titleContainer {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-top: 1.5rem;
                }
    
                .titleContainer h1{
                  color: #FA314A;
                }
    
                .titleContainer img{
                  height: 50px;
                  width: 50px;
                  margin-bottom: 14px;
                }
    
                .pass-change-icon {
                  width: 350px;
                }
    
                .pass-change-title {
                  width: 90%;
                }
    
                .pass-change-title h1{
                  text-align: center;
                }
    
                .alert {
                    text-decoration: none;
                    font-size: 1.4rem;
                    width: 75%;
                    padding: 2rem 2rem 2rem 2rem;
                    text-align: justify ;
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
                        <h1>Onion food</h1>
                    </div>
    
                    <img class="pass-change-icon" src="https://uploads-ssl.webflow.com/57261d5a78d342c0529dc2eb/5c42391cff0f508ac22b1a95_Reset-Password.png" alt="dispatch-icon">
    
                    
                    <div class='pass-change-title'>
                        <h1>${name}, your password was successfully updated</h1>
                    </div>
    
                    <div class='alert'>
                      <span>
                        If it wasn't you, please contact us as soon as possible.
                      </span>
                    </div>
    
                    <a class='link' href="http://localhost:3000/contact">
                      <span>Contact us!</span>
                    </a>
    
                </div>
            </div>
        </body>
    </html>
  `
  )
};