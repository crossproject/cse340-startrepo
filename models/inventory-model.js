const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}


/* ***************************
 *  Get car details by inv_id
 * ************************** */
async function getCarDetailsByInvId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory 
      WHERE inventory.inv_id = $1`,
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getcardetailsbyinvid error " + error)
  }
}

/* ***************************
 *  Add a new classification car
 * ************************** */
async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Check classification existence
 * ************************** */
async function checkExistingClassification(classification_name) {
  try {
    const sql = "SELECT * FROM public.classification WHERE classification_name = $1"
    const classificationQuery = await pool.query(sql, [classification_name])
    return classificationQuery.rowCount
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Add a new vehicle
 * ************************** */
async function addVehicle(
  classification_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color) {
  try {
    const sql = "INSERT INTO public.inventory (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    return await pool.query(sql, [
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color])
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Updates a vehicle's data
 * ************************** */
async function updateVehicle(
  inv_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id) {
  try {
    const sql = "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *"
    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id])
      return data.rows[0]
  } catch (error) {
    return "model error: " + error.message
  }
}


/* ***************************
 *  Delete a vehicle's data
 * ************************** */
async function deleteVehicle(
  inv_id) {
  try {
    const sql = 'DELETE FROM inventory WHERE inv_id = $1'
    const data = await pool.query(sql, [
      inv_id])
      return data
  } catch (error) {
    return "Delete Inventory Error"
  }
}

/* ***************************
 *  Get car reviews by inv_id
 * ************************** */
async function getReviewsByInvId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT account.account_firstname, account.account_lastname, review.review_text, review.review_date
      FROM public.review
      INNER JOIN public.account
        ON review.account_id = account.account_id
      WHERE review.inv_id = $1`,
      [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("getReviewsByInvId error " + error)
  }
}



/* ***************************
 *  Add a new review
 * ************************** */
async function addReview(
  review_text,
  inv_id,
  account_id) {
  try {
    const sql = "INSERT INTO public.review (review_text, inv_id, account_id) VALUES ($1, $2, $3) RETURNING *"
    return await pool.query(sql, [
      review_text,
      inv_id,
      account_id])
  } catch (error) {
    return error.message
  }
}



module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getCarDetailsByInvId,
  addClassification,
  checkExistingClassification,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getReviewsByInvId,
  addReview
}