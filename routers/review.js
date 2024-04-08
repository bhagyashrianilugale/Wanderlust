const express = require("express");
const router = express.Router({ mergeParams: true });


const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapasync = require("../utils/wrapasync.js");
const { validateReview, isLoggedIn, isReviewAuthor  } = require("../middleware.js");
const reviewController = require("../controller/reviews.js");



//-------------------- Review Post Route-----------------//

router.post("/",
   isLoggedIn,
   validateReview,
   wrapasync( async(req, res)=>{
      console.log(req.params.id)
      let listing = await Listing.findById(req.params.id);
      let newReview = new Review(req.body.review);
      newReview.author = req.user._id;
      console.log(newReview);
      listing.reviews.push(newReview);
   
      await newReview.save();
      await listing.save();
      req.flash("success", "New Review Created!");
      res.redirect(`/listings/${req.params.id}`);
   }
   ));

//------------------- Review Delete Route----------------//

router.delete("/:reviewId",
   isLoggedIn,
   isReviewAuthor,
   wrapasync( reviewController.destroyReview ));

module.exports = router;