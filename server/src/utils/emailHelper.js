const nodemailer = require('nodemailer');

exports.sendOrderConfirmationEmail = (orderDetails) => {
	const formattedDate = new Date(orderDetails.orderDateTime).toLocaleString(
		'en-CA',
		{
			dateStyle: 'medium',
			timeStyle: 'short',
		}
	);
//for sending emails
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_USER_NAME, // Your email username
			pass: process.env.EMAIL_PASSWORD,// Your email password
		},
	});

	const mailOptions = {
		from: `Food EATS <${process.env.EMAIL_USER_NAME}>`,
		to: {
			name: orderDetails.fullname,
			address: orderDetails.email,
		},
		subject: 'Order Confirmation',// Email subject
		html: `<p>Thank you for choosing Food Eats
		 Your order details:</p>your order on it's way
           <p>Order Date & Time: ${formattedDate}</p>`,
	};
 // Send the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent:', info.response);
		}
	});
};
