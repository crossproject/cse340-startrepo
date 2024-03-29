// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require('../utilities/inventory-validation')

// Route to inventory management
router.get("/", utilities.handleErrors(invController.buildManagementView));



// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build car product details
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

// Inexistent route for 500-type error
router.get("/faildirection", utilities.handleErrors(invController.badFunction))

// Route to build add classification view
router.get("/inventory/add-classification", utilities.handleErrors(invController.buildAddClassView));

// Route for register a new classification
router.post(
    "/inventory/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassData,
    utilities.handleErrors(invController.addClassification)
);

// Route to build add vehicle view
router.get("/inventory/add-inventory", utilities.handleErrors(invController.buildAddVehicleView));

// Route to add a vehicle
router.post(
    "/inventory/add-inventory",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addVehicle)
);

module.exports = router;