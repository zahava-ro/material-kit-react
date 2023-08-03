const sql = require("msnodesqlv8");
// const sql = require("mssql");

const server = 'localhost\\SQLEXPRESS01';
const database = 'Pest_Control';
const connectionString = `DRIVER={SQL Server};SERVER=${server};DATABASE=${database};Trusted_Connection=True;`; 

const query = "SELECT * from customer";
// const query = `INSERT INTO [dbo].[customer]
//            ([customer_id]
//            ,[company_name]
//            ,[status]
//            ,[email]
//            ,[phone_number]
//            ,[notes])
//      VALUES
//            (9628
//            ,'Test Inserted Customer FROM VSCODE'
//            ,'Active'
//            ,'test@inserted.com'
//            ,'444-444-4444'
//            ,'test notes FROM VSCODE')
// `;

const addCustomerToDB = (customer) => {
  const query = `INSERT INTO [dbo].[customer]
           ([customer_id]
           ,[company_name]
           ,[status]
           ,[email]
           ,[phone_number]
           ,[notes])
     VALUES
           (${customer.id}
           ,${customer.company_name}
           ,${customer.status}
           ,${customer.email}
           ,${customer.phone_number}
           ,${customer.notes})
  `;

  sql.query(connectionString, query, (err, rows) => {
    console.log(rows);
  });
}

// addCustomer(dummyCustomers[0]);

sql.query(connectionString, query, (err, rows) => {
  console.log(rows);
});