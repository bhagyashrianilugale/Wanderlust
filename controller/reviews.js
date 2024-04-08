const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.destroyReview = async (req, res)=>{
    let { id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!"); 
    res.redirect(`/listings/${id}`);
}