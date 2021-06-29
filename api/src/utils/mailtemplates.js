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

exports.mailResetPass = function (name, lastName, email, token) {
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
  <h1> Hello ${name} ${lastName}</h1>
  <img src="https://image.shutterstock.com/image-vector/onion-logo-vector-template-260nw-1243777168.jpg"/>
  <h4>You requested a password reset for <span class="contact">${email}</span></h4>
  <span class="contact"><a href='http://localhost:3000/passwordReset?token=${token}'>Reset password</a></span>
  <footer>
    <h5>You are more than welcome to write us at <span class="contact"><a href='http://localhost:3000/contact'>Contact</a></span></h5>
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
          <a href="http://localhost:3000/user" class="button">Give us a review!</a>
          <footer>
            <h5>You are more than welcome to write us at <span class="contact"><a href='http://localhost:3000/contact'>Contact</a></span></h5>
          </footer>
          </div>
      </body>
      </html>

    `
        )
    };

exports.mailDispatched = function (name, lastName, order) {
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
        <h1>We are on our way, ${name} ${lastName}</h1>
        <img width="5%" src="https://image.shutterstock.com/image-vector/onion-logo-vector-template-260nw-1243777168.jpg" />
    <h2> 
      Your order ${order.id} is now dispatched,</h2> <h2> it will arrive promptly to ${order.street} in ${order.city}</h2>
      
        <a href="http://localhost:3000/user" class="button">See your Orders</a>
        <footer>
          <h5>You are more than welcome to write us at <span class="contact"><a href='http://localhost:3000/contact'>Contact</a></span></h5>
        </footer>
        </div>

    </body>
    </html>`
    )
};


exports.twoFAEmailMail = function (name, token) {
  return (
        `<!DOCTYPE html>
    <html>
    <head>
    <style>
      .contact a {
        text-decoration:none!important;
      }

      body {
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        }
      h2 {
        background-color: #CE1212;
        border-radius: 0.5rem  0.5rem  0rem  0rem;
        color: #EEEBDD;
        padding: 16px;
      }

      .container {
        background-color: #EEEBDD;
        border-radius: 0.5rem;
        width: 75%;
        box-shadow: 6px 6px 6px -1.2px rgba(102, 87, 87, 0.73);
      }

      p, h3, h4, h5 {
        color: #1B1717;
      }

      .button{
          color: #EEEBDD;
          background-color: #CE1212;
          font-size: 16px;
          border: none;
          border-radius: 0.2rem;
          margin: 1rem;
          padding: 0.5rem;
          box-shadow: 0 0 6px -1.6px #1B1717;
        }

      .button:hover {
          background-color: #a90f0f;
          font-size: 16px;
          border: none;
          border-radius: 0.2rem;
          margin: 1rem;
          padding: 0.5rem;
        }

      footer {
        background-color: #CE1212;
        border-radius:  0rem  0rem 0.5rem  0.5rem;
      }

      footer h5{
        padding: 8px;
      }

      a {
          text-decoration: none;
          color: #EEEBDD;
        }

      img {
          display: inline-block;
          width: 4rem;
          border-radius: 1rem;
          box-shadow: 0 0 6px -1.6px #1B1717;
        }
      h5 {
        color: #EEEBDD;
        font-weight: 100;
        }

      h5 a {
        font-weight: bold;
        }

      .code {
        font-weight: 200;
      }

    </style>
    </head>
      <body id='body'>
        <div align='center' class='root' >
          <div class='container' align='center'>
            <h2> Hello ${name}!</h2>
            <h3> Please use the following code to continue your authentication process</h3>
            <h4> Code: <span class="code" > ${token} </span> </h4>
            <span class="contact">
              <a href="http://localhost:3000/authentication" class="button">Continue!</a>
            </span>
            <footer>
              <h5>You are more than welcome to write us at <span class="contact">
                <a href='http://localhost:3000/contact'>Contact</a></span>
              </h5>
            </footer>
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

exports.changePasswordMail = function (name) {
  return (
        `<!DOCTYPE html>
    <html>
    <head>

    <style>

      body {
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      }

      a {
          text-decoration: none;
          color: #EEEBDD;
      }

      .container {
        background-color: #EEEBDD;
        border-radius: 0.5rem;
        width: 75%;
        box-shadow: 6px 6px 6px -1.2px rgba(102, 87, 87, 0.73);
      }

      h2 {
        background-color: #CE1212;
        border-radius: 0.5rem  0.5rem  0rem  0rem;
        color: #EEEBDD;
        padding: 16px;
      }

      p, h3, h4, h5 {
        color: #1B1717;
      }

      .button{
          color: #EEEBDD;
          background-color: #CE1212;
          font-size: 16px;
          border: none;
          border-radius: 0.2rem;
          margin: 1rem;
          padding: 0.5rem;
          box-shadow: 0 0 6px -1.6px #1B1717;
        }

      .button:hover {
          background-color: #a90f0f;
          font-size: 16px;
          border: none;
          border-radius: 0.2rem;
          margin: 1rem;
          padding: 0.5rem;
        }

      footer {
        background-color: #CE1212;
        border-radius:  0rem  0rem 0.5rem  0.5rem;
      }

      footer h5{
        padding: 8px;
      }

      footer a {
        text-decoration:none!important;
      }

      
      h5 {
        color: #EEEBDD;
        font-weight: 100;
        }

      h5 a {
        font-weight: bold;
        }

    </style>

    </head>
    <body id='body'>
      <div align='center' class='root' >
        <div class='container' align='center'>
          <h2> Hello ${name}!</h2>
          <h3> Your password was successfully updated. If it wasn't you, please contact us through the web</h3>
          <span class="contact">
            <a href="http://localhost:3000/" class="button">Continue to our Web</a>
          </span>
          <footer>
            <h5>You are more than welcome to write us at <span class="contact">
              <a href='http://localhost:3000/contact'>Contact</a></span>
            </h5>
          </footer>
        </div>
      </div>     
    </body>
  </html>
  `
     )
};