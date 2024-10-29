
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const pg = require('pg');

// Create a new Pool instance for PostgreSQL connection
const pool = new Pool({
  user: 'openpg', // Replace with your PostgreSQL user
  host: 'localhost', // PostgreSQL server host
  database: 'telal', // Your database name
  password: 'kappil123', // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());


// Test DB connection on startup
pool.connect()
  .then(() => console.log('Connected to PostgreSQL successfully'))
  .catch(err => console.error('Database connection error:', err));

// Login endpoint to validate user credentials
app.post('/login', async (req, res) => {
  const { email, password, branch } = req.body;
  try {
    // Check if user exists with the provided email and password
    const result = await pool.query(
      'SELECT userid, pwd, branch FROM users WHERE userID = $1 AND pwd = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      // If user is found, return success response
      const { userid, branch } = result.rows[0];
      res.status(200).json({
        message: 'Login successful',
        user: { userid, branch }
      });
    } else {
      // If no user found, return error response
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// New endpoint to fetch primary items (with optional search filtering)
app.get('/api/primaryitems', async (req, res) => {
  const { search } = req.query; // Optional search query parameter
  
  try {
    let query = 'SELECT itemname FROM primaryitem'; // Modify based on actual table schema
    let params = [];

    if (search) {
      query += ' WHERE LOWER(itemname) LIKE $1';
      params.push(`%${search.toLowerCase()}%`);

    }

    const result = await pool.query(query, params);
    console.log(result)
    res.status(200).json(result.rows.map(row => row.itemname)); // Return the list of item names
  } catch (error) {
    console.error('Error fetching primary items:', error);
    res.status(500).json({ error: 'Failed to fetch primary items' });
  }
});

app.get('/api/giftitems', async (req, res) => {
  const { search } = req.query; // Optional search query parameter
  
  try {
    let query = 'SELECT giftitemname FROM giftitem'; // Replace with your actual table name
    let params = [];

    if (search) {
      query += ' WHERE LOWER(giftitemname) LIKE $1';
      params.push(`%${search.toLowerCase()}%`);
    }

    console.log('Executing query:', query, 'with params:', params);

    const result = await pool.query(query, params);
    console.log('Result object:', result); // Log the entire result object
    if (result.rows.length > 0) {
      
      console.log('Gift items found:', result.rows); // Log found results
      res.status(200).json(result.rows.map(row => row.giftitemname)); // Return the list of gift item names
    } else {
      console.log('No gift items found.'); // Log when no items are found
      res.status(404).json({ message: 'No gift items found' });
    }


    //res.status(200).json(result.rows.map(row => row.giftitemname)); // Return the list of gift item names
  } catch (error) {
    console.error('Error fetching gift items:', error);
    res.status(500).json({ error: 'Failed to fetch gift items' });
  }
});

app.post('/api/OrderForm', async (req, res) => {
  const { orderDate, customerName, customerMobile, customerEmail, orderItems } = req.body;
  const client = await pool.connect();

  try {
    // Start a transaction
    await client.query('BEGIN');

    // Insert the main order details
    const orderResult = await client.query(
      'INSERT INTO ordmaster (orddate, ordcustomer, ordmobile, ordemail) VALUES ($1, $2, $3, $4) RETURNING ordid',
      [orderDate, customerName, customerMobile, customerEmail]
    );

    const orderId = orderResult.rows[0].ordid;  // Get the generated order ID

    // Insert into orderdetail for each item
    const itemPromises = orderItems.map(item => {
      return client.query(
        'INSERT INTO orderdetail (detordid, detpriitem, detgiftitem, detqty) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_name, item.gift_product, item.quantity]
      );
    });

    // Wait for all item insertions to complete
    await Promise.all(itemPromises);

    // Commit the transaction
    await client.query('COMMIT');

    res.status(201).json({ message: 'Entry Saved Successfully', orderId });
  } catch (error) {
    // Rollback transaction in case of error
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    client.release();
  }
});

app.get('/api/giftcount', async (req, res) => {
  const { search } = req.query; // Optional search query parameter
  
  try {
    let query = 'SELECT ordbranch,detgiftitem,SUM(detqty) FROM orderdetail,ordmaster  where ordid= detordid GROUP BY ordbranch,detgiftitem';
    //let query = 'SELECT ordbranch "Branch", ordcustomer "Cust", detgiftitem "Gift",detqty "Qty"  FROM orderdetail,ordmaster  where ordid= detordid';
    let params = [];

   /* if (search) {
      query += ' WHERE LOWER(itemname) LIKE $1';
      params.push(`%${search.toLowerCase()}%`);
    }*/

    const result = await pool.query(query );
    console.log(result)
    res.status(200).json(result.rows); 
  } catch (error) {
    console.error('Error fetching primary items:', error);
    res.status(500).json({ error: 'Failed to fetch primary items' });
  }
});


app.get('/api/detailslist', async (req1, res1) => {
  //app.get('/detailslist', async (req1, res1) => {
  const { search } = req1.query; // Optional search query parameter
  
  try {
    let query1 = 'SELECT ordbranch "Branch", ordcustomer "Cust", detgiftitem "Gift",detqty "Qty"  FROM orderdetail,ordmaster  where ordid= detordid';
    let params = [];

   /* if (search) {
      query += ' WHERE LOWER(itemname) LIKE $1';
      params.push(`%${search.toLowerCase()}%`);
    }*/

    const result = await pool.query(query1 );
    console.log(result)
    res1.status(200).json(result.rows); 
  } catch (error) {
    console.error('Error fetching primary items:', error);
    res1.status(500).json({ error: 'Failed to fetch primary items' });
  }
});




// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
