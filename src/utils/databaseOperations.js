// Functions to fetch data from the database and add data to the database:

/** Function: fetchAllFromTable
 * Parameters:  Table Name (string)
 * Description: retrieves all the records from a table
 * Returns: all the records in the table
 */
export const fetchAllFromTable = async (tableName) => {
    const response = await fetch(`http://localhost:5000/${tableName}`);
    if (!response.ok) {
    throw new Error('Failed to fetch data from the server');
    }
    const data = await response.json();
    return data;
};

/** Function: addToTable
 * Parameters:  Table Name (string)
 *              Item to be added to the database (JSON object)
 * Description: Adds a record to a table in the database
 */
export const addToTable = async (tableName, item) => {
    const response = await fetch(`http://localhost:5000/insert-${tableName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`Error adding ${tableName} to database`);
    }

    const data = await response.json();
    console.log(data.code);
}