const nodemailer = require('nodemailer');

exports.sendOrderConfirmationEmail = (orderDetails) => {
	const formattedDate = new Date(orderDetails.orderDateTime).toLocaleString(
		'en-CA',
		{
			dateStyle: 'medium',
			timeStyle: 'short',
		}
	);

	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_USER_NAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: `Food Service <${process.env.EMAIL_USER_NAME}>`,
		to: {
			name: orderDetails.fullname,
			address: orderDetails.email,
		},
		subject: 'Order Confirmation',
		html: `<p>Thank you for your order! Your order details:</p>
           <p>Total Price: $${orderDetails.total}</p>
           <p>Order Date & Time: ${formattedDate}</p>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent:', info.response);
		}
	});
};
