// // Get all customers from the database
// app.get('/customer', function (req, res) {
// 	let query = "SELECT * from customer";
// 	sql.query(connectionString, query, (err, rows) => { res.json(rows) }); // send the response to the browser as json
// });

// // Add a service to the database
// app.post('/insert-customer', function (req, res) {
// 	let query = `INSERT INTO [dbo].[customer]
// 				([customer_id]
// 				,[company_name]
// 				,[status]
// 				,[email]
// 				,[phone_number]
// 				,[notes])
// 			VALUES
// 				(${req.body.customer_id}
// 				,'${req.body.company_name}'
// 				,'${req.body.status}'
// 				,'${req.body.email}'
// 				,'${req.body.phone_number}'
// 				,'${req.body.notes}')
// 	`;
// 	sql.query(connectionString, query, (err) => { res.json({"code":"customer added"}) });
// });
const express = require('express');
const app = express();
const sql = require("msnodesqlv8");
const cors = require('cors');
app.use(express.json());
app.use(cors());

const connectionString = `DRIVER={SQL Server};SERVER=localhost\\SQLEXPRESS01;DATABASE=Pest_Control;Trusted_Connection=True;`; 

// Get all customers from the database
app.get('/customer', function (req, res) {
  let query = "SELECT * from customer";
  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      console.error('Error fetching customers:', err);
      res.status(500).json({ error: 'Error fetching customers' });
    } else {
      res.json(rows);
    }
  });
});

// Add a customer to the database
app.post('/insert-customer', function (req, res) {
  let query = `INSERT INTO [dbo].[customer]
      ([customer_id]
      ,[company_name]
      ,[status]
      ,[email]
      ,[phone_number]
      ,[notes])
    VALUES
      (${req.body.customer_id}
      ,'${req.body.company_name}'
      ,'${req.body.status}'
      ,'${req.body.email}'
      ,'${req.body.phone_number}'
      ,'${req.body.notes}')
  `;
  sql.query(connectionString, query, (err) => {
    if (err) {
      console.error('Error adding customer:', err);
      res.status(500).json({ error: 'Error adding customer' });
    } else {
      res.json({"code":"customer added"});
    }
  });
});

// Get all services from the database
app.get('/service', function (req, res) {
  let query = "SELECT * from service";
  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      console.error('Error fetching services:', err);
      res.status(500).json({ error: 'Error fetching services' });
    } else {
      res.json(rows);
    }
  });
});

// Add a service to the database
app.post('/insert-service', function (req, res) {
  let query = `INSERT INTO [dbo].[service]
      ([service_id]
      ,[service_name]
      ,[description]
      ,[materials_list_id]
      ,[cost]
      ,[notes])
    VALUES
    (${req.body.service_id}
      ,'${req.body.service_name}'
      ,'${req.body.description}'
      ,${req.body.materials_list_id}
      ,${req.body.cost}
      ,'${req.body.notes}')
  `;
  sql.query(connectionString, query, (err) => {
    if (err) {
      console.error('Error adding service:', err);
      res.status(500).json({ error: 'Error adding service' });
    } else {
      res.json({"code":"service added"});
    }
  });
});

// Get all appointments from the database
app.get('/appointment', function (req, res) {
  let query = "SELECT * from appointment";
  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ error: 'Error fetching appointments' });
    } else {
      res.json(rows);
    }
  });
});

// Add an appointment to the database
app.post('/insert-appointment', function (req, res) {
  let query = `INSERT INTO [dbo].[appointment]
			([appointment_id]
			,[customer_id]
			,[location_id]
			,[date_and_time]
			,[service_group_id]
			,[employee_group_id]
			,[cost]
			,[completion_status]
			,[payment_status]
			,[frequency_in_days]
			,[followup_appointment]
			,[followup_reason]
			,[notes])
		VALUES
			(${req.body.appointment_id}
			,${req.body.customer_id}
			,${req.body.location_id}
			,'${req.body.date_and_time}'
			,${req.body.service_group_id}
			,${req.body.employee_group_id}
			,${req.body.cost}
			,'${req.body.completion_status}'
			,'${req.body.payment_status}'
			,${req.body.frequency_in_days}
			,'${req.body.followup_appointment}'
			,'${req.body.followup_reason}'
			,'${req.body.notes}')
  `;
  sql.query(connectionString, query, (err) => {
    if (err) {
      console.error('Error adding appointment:', err);
      res.status(500).json({ error: 'Error adding appointment' });
    } else {
      res.json({"code":"appointment added"});
    }
  });
});

//-----------NEED TO EDIT QUERYS FROM HERE ON-------------

// Get all materials from the database
app.get('/materials', function (req, res) {
  let query = "SELECT * from materials";
  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      console.error('Error fetching materials:', err);
      res.status(500).json({ error: 'Error fetching materials' });
    } else {
      res.json(rows);
    }
  });
});

// Add materials to the database
app.post('/insert-materials', function (req, res) {
  let query = `INSERT INTO [dbo].[materials]
      ([material_id]
      ,[material_name]
      ,[quantity]
      ,[supplier]
      ,[price]
      ,[notes])
    VALUES
    (${req.body.material_id}
      ,'${req.body.material_name}'
      ,${req.body.quantity}
      ,'${req.body.supplier}'
      ,${req.body.price}
      ,'${req.body.notes}')
  `;
  sql.query(connectionString, query, (err) => {
    if (err) {
      console.error('Error adding materials:', err);
      res.status(500).json({ error: 'Error adding materials' });
    } else {
      res.json({"code":"materials added"});
    }
  });
});

// Get all pest_control_employees from the database
app.get('/pest_control_employees', function (req, res) {
  let query = "SELECT * from pest_control_employees";
  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      console.error('Error fetching pest_control_employees:', err);
      res.status(500).json({ error: 'Error fetching pest_control_employees' });
    } else {
      res.json(rows);
    }
  });
});

// Add pest_control_employees to the database
app.post('/insert-pest_control_employees', function (req, res) {
	let query = `INSERT INTO [dbo].[pest_control_employees]
		([employee_id]
		,[first_name]
		,[last_name]
		,[position]
		,[phone_number]
		,[email]
		,[notes])
	  VALUES
	  (${req.body.employee_id}
		,'${req.body.first_name}'
		,'${req.body.last_name}'
		,'${req.body.position}'
		,'${req.body.phone_number}'
		,'${req.body.email}'
		,'${req.body.notes}')
	`;
	sql.query(connectionString, query, (err) => {
	  if (err) {
		console.error('Error adding pest_control_employees:', err);
		res.status(500).json({ error: 'Error adding pest_control_employees' });
	  } else {
		res.json({"code":"pest_control_employees added"});
	  }
	});
  });
  
  app.listen(5000, function () { console.log('Server is listening at port 5000...');});
  
