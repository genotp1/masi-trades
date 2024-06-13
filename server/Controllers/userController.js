const User = require('../Model/User');
const Deposit = require('../Model/depositSchema');
const Widthdraw = require('../Model/widthdrawSchema');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');





// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };



module.exports.homePage = (req, res) =>{
    res.render('index')
}

module.exports.aboutPage = (req, res) =>{
    res.render('about')
}


module.exports.contactPage = (req, res) =>{
    res.render('contact')
}

module.exports.faqPage = (req, res) =>{
    res.render('faq')
}

module.exports.privacyPage = (req, res) =>{
    res.render('privacy')
}

module.exports.loginAdmin = (req, res) =>{
    res.render('loginAdmin');
}

module.exports.accountType = (req, res) =>{
    res.render('accountType')
}

module.exports.registerPage = (req, res) =>{
    res.render('register')
}

module.exports.buyCrypto = (req, res) =>{
  res.render('buyCrypto')
}

// const sendEmail = async (fullname, email,  password ) =>{
    
//   try {
//   const transporter =  nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'masitradestm@gmail.com',
//         pass: 'ommavtgyupywyptb'
//     }

//     });
//     const mailOptions = {
//       from:'masitradestm@gmail.com',
//       to: email,
//       subject: 'Welcome to MASI-TRADES',
//       html: `<p> GREETINGS ${fullname}, You are welcome to masi-trades we are looking forward to work with you, below are your registration details,<br>Email: ${email}<br>Password: ${password} </p>`
//   }
//   transporter.sendMail(mailOptions, (error, info) =>{
//     if(error){
//         console.log(error);
//         res.send('error');
//     }else{
//         console.log('email sent: ' + info.response);
//         res.send('success')
//     }
// })

//   } catch (error) {
//     console.log(error.message);
//   }
// }

const sendEmail = async ( fullname, email,  password ) =>{
    
  try {
  const transporter =  nodemailer.createTransport({
    host: 'mail.masi-trades.org',
    port:  465,
    auth: {
        user: 'masitrad',
        // pass: 'dstJfTV7KfC9RB7'
        pass: 'wi4mmJ.QDC}Q' 
    }

    });
    const mailOptions = {
      from:'masitrad@masi-trades.org',
      to:email,
      subject: 'Welcome to MASI-TRADES',
      html: `<p>Hello  ${fullname},<br>Thank you for registering on our site.
      Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: https://masi-trades.org/login<br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})

// Hello Pius,

// Thank you for registering on our site.

// Your login information:

// Login: Matera 
// Password: 000000

// You can login here: https://masi-trades.org/

// Contact us immediately if you did not authorize this registration.

// Thank you.

  } catch (error) {
    console.log(error.message);
  }
}
module.exports.register_post = async (req, res) =>{
    const {fullname, country, gender,tel,  email, password, } = req.body;
    try {
        const user = await User.create({fullname,country, gender, tel, email,  password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });

        // if(user){
        //   sendEmail(req.body.fullname,req.body.email, req.body.password)
        // }else{
        //   console.log(error);
        // }
      }
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
          }
    
}
module.exports.loginPage = (req, res) =>{
    res.render('login')
}

module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.dashboardPage = (req, res) =>{
  res.render('dashboard');
}


module.exports.accountPage = async(req, res) =>{
  const id = req.params.id
  const user = await User.findById(id);
  res.render('account', {user})
}

module.exports.depositPage = async(req, res) =>{
    res.render('fundAccount')
}


const depositEmail = async (  email, amount ) =>{
    
  try {
  const transporter =  nodemailer.createTransport({
    host: 'mail.masi-trades.org',
    port:  465,
    auth: {
        user: 'masitrad',
        // pass: 'dstJfTV7KfC9RB7'
        pass: 'wi4mmJ.QDC}Q' 
    }

    });
    const mailOptions = {
      from:email,
      to:'masitrad@masi-trades.org',
      subject: 'Deposit Just Made',
      html: `<p>Hello SomeOne,<br>made a deposit of ${amount}.<br>
      deposit detail are below Admin <br>Pending Deposit: ${amount}<br><br>Deposit status:Pending <br>You can login here: https://masi-trades.org/loginAdmin<br> to approve the deposit.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})

// Hello Pius,

// Thank you for registering on our site.

// Your login information:

// Login: Matera 
// Password: 000000

// You can login here: https://masi-trades.org/

// Contact us immediately if you did not authorize this registration.

// Thank you.

  } catch (error) {
    console.log(error.message);
  }
}

module.exports.depositPage_post = async(req, res) =>{
    try {
      const deposit = new Deposit({
        wallet: req.body.wallet,
        amount: req.body.amount,
        status: req.body.status,
        image: req.file.image,
      });
      deposit.save()
      const id = req.params.id;
      const user = await User.findById( id);
      user.deposits.push(deposit);
      await user.save();

      res.render('allDeposit', { user})
      // if(user){
      //   depositEmail(req.body.email,  req.body.amount)
      // }else{
      //   console.log(error);
      // }
      // res.send('works good')
    } catch (error) {
      console.log(error)
    }

  
}

module.exports.depositHistory = async(req, res) =>{
    try {
    const id = req.params.id;
    const user = await User.findById(id).populate("deposits")
    res.render('allDeposit', { user});
    // res.json(user)
    } catch (error) {
      console.log(error)
    }
}


module.exports.widthdrawPage = (req, res) =>{
    res.render('widthdrawFunds')
}


const widthdrawEmail = async (  email, amount, wallet ) =>{
    
  try {
  const transporter =  nodemailer.createTransport({
    host: 'mail.masi-trades.org',
    port:  465,
    auth: {
        user: 'masitrad',
        // pass: 'dstJfTV7KfC9RB7'
        pass: 'wi4mmJ.QDC}Q' 
    }

    });
    const mailOptions = {
      from:email,
      to:'masitrad@masi-trades.org',
      subject: 'Widthdrawal Just Made',
      html: `<p>Hello SomeOne,<br>made a Widthdrawal of ${amount}.<br>
      Widthdrawal details are below Admin <br>Pending Widthdrawal: ${amount}<br><br>Widthdrawal status:Pending
      <br>Widthdrawal wallet:${wallet}
       <br>You can login here: https://masi-trades.org/loginAdmin<br> to approve the Widthdrawal.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})

// Hello Pius,

// Thank you for registering on our site.

// Your login information:

// Login: Matera 
// Password: 000000

// You can login here: https://masi-trades.org/

// Contact us immediately if you did not authorize this registration.

// Thank you.

  } catch (error) {
    console.log(error.message);
  }
}
module.exports.widthdrawPage_post = async(req, res) =>{
  try {
    const widthdraw = new Widthdraw({
      wallet: req.body.wallet,
      amount: req.body.amount,
      status: req.body.status,
    });
    widthdraw.save()
    const id = req.params.id;
    const user = await User.findById(id)
    user.widthdraws.push(widthdraw);
    await user.save();
    
    res.render('allWidthdraws', { user});
    // if(user){
    //   widthdrawEmail(req.body.email,  req.body.amount,req.body.wallet,)
    // }else{
    //   console.log(error);
    // }
  } catch (error) {
    console.log(error)
  }

}

module.exports.widthdrawHistory = async(req, res) =>{
  const id = req.params.id;
  const user =  await User.findById(id).populate("widthdraws");
     res.render('allWidthdraws', { user})
}


module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}



