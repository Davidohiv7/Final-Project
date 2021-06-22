exports.mailSignUp = function (name, lastName, email) {
    return (
`<!DOCTYPE html>
<html>
<head>
<style>
.contact a {
    color: #1B1717!important; 
    text-decoration:none!important;
}

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

p, h2, h4, h5 {
  color: #1B1717;
}

.button{
    background-color: #CE1212;
    font-size: 16px;
    border: none;
    border-radius: 0.2rem;
    margin: 1rem;
    padding: 0.5rem;
  }

footer {
  background-color: #CE1212;
  border-radius: 0.5rem;
}
  
a{
    text-decoration: none;
    color: #EEEBDD;
  }
  
img{
    display: inline-block;
    width: 4rem;
    border-radius: 1rem;
    box-shadow: 0 0 6px -1.6px #1B1717;
  }

</style>
</head>
<body id='body'>
  <div align='center'>
    <h1> Welcome ${name} ${lastName}</h1>
    <img src="https://image.shutterstock.com/image-vector/onion-logo-vector-template-260nw-1243777168.jpg"/>
<h2> 
  To the best food supplier for your bussiness.</h2>
  <h4>Your account <span class="contact">${email}</span> has been created</h4>
    <span class="contact"><a href="https://localhost:3000" class="button">Continue!</a></span>
    <footer>
      <h5>You are more than welcome to write us at <span class="contact"><a href='https://localhost/3000/contact'>Contact</a></span></h5>
    </footer>
    </div>

</body>
</html>
`
)
};

exports.mailBuy = function (name, order, cart) {
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

            h2 {
              color: #1B1717;
            }
            .button{
                background-color: #CE1212;
                font-size: 16px;
                border: none;
                border-radius: 0.2rem;
                margin: 1rem;
                padding: 0.5rem;
              }
            footer {
              background-color: #CE1212;
              border-radius: 0.5rem;
            }
            a{
                text-decoration: none;
                color: #EEEBDD;
              }
              
            img {
                display: inline-block;
                width: 4 rem;
                border-radius: 1 rem;
                box-shadow: 0 0 6 px -1.6 px #1B1717;
              }
          </style>
        </head>
      <body>
        <div align='center'>
          <h1>Thanks for your bussiness ${name}</h1>
          <img src="https://image.shutterstock.com/image-vector/onion-logo-vector-template-260nw-1243777168.jpg" />
          <h2> Your order Number ${order.id} will be delivered shortly!</h2>
          <ul>
            ${cart.map((prod)=>"<li>" + prod.name + " Subtotal: " + prod.price*prod.quantity + "</li>")}
          </ul>
          <h2>Total: $${order.total}</h2>
          <a href="https://localhost:3000/user" class="button">Give us a review!</a>
          <footer>
            <h5>You are more than welcome to write us at <span class="contact"><a href='https://localhost/3000/contact'>Contact</a></span></h5>
          </footer>
          </div>
      </body>
      </html>

    `
        )
    };

exports.orderStatus = function (name, order, orderList) {
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

h2 {
  color: #1B1717;
}

.button{
    background-color: #CE1212;
    font-size: 16px;
    border: none;
    border-radius: 0.2rem;
    margin: 1rem;
    padding: 0.5rem;
  }

footer {
  background-color: #CE1212;
  border-radius: 0.5rem;
}
  
a{
    text-decoration: none;
    color: #EEEBDD;
  }
  
img {
    display: inline-block;
    width: 4 rem;
    border-radius: 1 rem;
    box-shadow: 0 0 6 px -1.6 px #1B1717;
  }

</style>
</head>
<body>
  <div align='center'>
    <h1>We are on our way, ${name}</h1>
    <img src="https://image.shutterstock.com/image-vector/onion-logo-vector-template-260nw-1243777168.jpg" />
<h2> 
  Your order ${order.id} is now ${order.status}</h2>
  <div>${orderList}</div>
    <a href="https://localhost:3000/user" class="button">See your Orders</a>
    <footer>
      <h5>You are more than welcome to write us at <span class="contact"><a href='https://localhost/3000/contact'>Contact</a></span></h5>
    </footer>
    </div>

</body>
</html>

`
    )
};