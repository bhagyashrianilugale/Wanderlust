const express = require("express");
const router = express.Router();

const { isLoggedIn }  = require("../middleware.js");
const  { validateListing }  = require("../middleware.js");
const   { isOwner } = require("../middleware.js");
const wrapasync = require("../utils/wrapasync.js");
const Listing = require("../models/listing.js");
const listingController = require("../controller/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


//---------------------------All listing routes------------------------//
//Filter Route

router.get("/filter/:id", wrapasync(listingController.filter));                             

router.get("/filterbtn",listingController.filterbtn);    

// Index Route
router.get( "/", wrapasync( listingController.index ));

// Search Route
router.get( "/search", wrapasync( listingController.search ));

// Create Route
router.post( "/", isLoggedIn,  upload.single( "listing[image]" ),validateListing,
       wrapasync( listingController.createListing));
       
// New Route
router.get( "/new", isLoggedIn, 
       wrapasync( listingController.newListing ));

// Show Listing
router.get( "/:id", wrapasync ( listingController.showListing));

// Update Route  
router.put( "/:id", isLoggedIn,isOwner, upload.single( "listing[image]" ),validateListing,
       wrapasync ( listingController.updateListing ));

 // Delete Route      
 router.delete( "/:id", isLoggedIn,isOwner,
       wrapasync ( listingController.destroyListing ));

// Edit Route
router.get( "/:id/edit", isLoggedIn, isOwner,
    wrapasync ( listingController.renderEditForm ));

    module.exports = router;

