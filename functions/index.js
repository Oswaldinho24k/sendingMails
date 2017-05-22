const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = encodeURIComponent(functions.config().gmail.mail);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);


exports.sendEmail = functions.database.ref('/users/{uid}').onWrite(event => {
  const snapshot = event.data;
  const val = snapshot.val();
  if(!snapshot.changed('subscribedToMailingList')){
    return
  }

	const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
	const mailOptions = {
	    from: '"FixterSpamSystem." <noreply@firebase.com>',
	    to: val.email
	    //subject: 'hunger ✔', // Subject line
	    //text: 'Una pizza o khé ?', // plain text body
	    //html: '<b>Hotcakes or what ?</b>' // html body
	  };
    if(val.subscribedToMailingList){
      mailOptions.subject = 'Gracias por suscribirte paps';
      mailOptions.text = 'Eres la onda porque te suscribiste, sólo por eso ;)';
      return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New subscription confirmation email sent to:', val.email);
      });
    }

});

exports.sendInvitation = functions.database.ref('/users/{uid}/friends/{pushId}').onWrite(event => {
  const snapshot = event.data;
  var sender = event.auth.variable.name;
  console.log(event.auth.variable.name)
  const val = snapshot.val();
  console.log(val)
  
  if(!snapshot.changed('invited')){
    return
  }

	const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
	const mailOptions = {
	    from: '"FixterSpamSystem." <noreply@firebase.com>',
	    to: val.email
	    //subject: 'hunger ✔', // Subject line
	    //text: 'Una pizza o khé ?', // plain text body
	    //html: '<b>Hotcakes or what ?</b>' // html body
	  };
    if(val.invited){
      mailOptions.subject = 'Invitación de ' + sender ;
      mailOptions.text = 'Usa la app, está genial!!!, regístrate en https://spamlist-9ab3e.firebaseapp.com/';
      return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New invitation email sent to:', val.email);
      });
    }

});
