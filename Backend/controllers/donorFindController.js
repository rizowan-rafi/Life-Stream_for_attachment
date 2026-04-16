import Donor from "../models/donorSchema.js";

const donorFindController = async (req, res) => {
    const { bloodGroup, location } = req.query;

    if (!bloodGroup || !location) {
        return res.status(400).json({
            success: false,
            message: "Please provide both bloodGroup and location as query parameters"
        });
    }

    try {
        
        const searchBloodGroup = bloodGroup.trim().toUpperCase();
        const searchLocation = location.trim();

        const donors = await Donor.find({
            bloodGroup: searchBloodGroup,
            
            location: { $regex: searchLocation, $options: "i" }
        }).select("-password -__v");

        return res.status(200).json({
            success: true,
            donors
        });

    } catch (error) {
        console.error("Error finding donors:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export default donorFindController;