const db = require("../models");

// Default campaigns for development stage
const defaultItems = [
  new db.Campaign({
    title: "Support Cancer Research",
    description:
      "Join us in the fight against cancer. Your donations will help fund vital research to find a cure and support patients with the care they need during their treatment journey. Together, we can make a difference in the lives of those battling cancer.",
    imageUrl:
      "https://www.shutterstock.com/image-photo/secure-high-level-laboratory-scientists-coverall-684989614.jpg",
    required: 500000,
    start: new Date(),
  }),
  new db.Campaign({
    title: "Build Schools for Children",
    description:
      "Help provide education to children in underprivileged areas. Your donations will go towards building new schools, providing supplies, and supporting teachers. Education is a powerful tool to break the cycle of poverty, and you can be a part of that change.",
    imageUrl:
      "https://www.shutterstock.com/image-photo/katni-india-january-1-2020-indian-1605120940.jpg",
    required: 2500000,
    start: new Date(),
  }),
  new db.Campaign({
    title: "Provide Clean Water to Communities",
    description:
      "Access to clean water is a basic human right. Help us bring clean drinking water to communities around the world that suffer from water scarcity. Your donation will build wells and provide filtration systems, ensuring families have access to safe water.",
    imageUrl:
      "https://www.shutterstock.com/image-photo/clean-water-storage-place-mossy-bottoms-2401894695jpg",
    required: 20000,
    start: new Date(),
  }),
  new db.Campaign({
    title: "Feed the Homeless",
    description:
      "Every night, thousands of people go to bed hungry. Your donation will provide meals for homeless individuals, ensuring they have a warm meal and a sense of dignity. Together, we can help end hunger and support those in need in our communities.",
    imageUrl:
      "https://www.shutterstock.com/image-photo/homeless-people-helped-food-relief-famine-1432140299.jpg",
    required: 50000,
    start: new Date(),
  }),
];

// Add default campaigns if the database is empty
db.Campaign.find().exec(function (err, results) {
  if (err) {
    console.error("Error checking Campaign collection:", err);
    return;
  }

  if (results.length === 0) {
    db.Campaign.insertMany(defaultItems, function (err) {
      if (err) {
        console.error("Error adding default campaigns:", err);
      } else {
        console.log("Successfully added default campaigns to the database.");
      }
    });
  }
});

// Helper function to mask transaction IDs
function hideTransactionID(donors) {
  if (!donors || !Array.isArray(donors)) {
    console.log("No donors or donors is not an array.");
    return;
  }

  donors.forEach((donor) => {
    if (donor.transactionID && typeof donor.transactionID === "string") {
      donor.transactionID = donor.transactionID
        .split("")
        .map((char, index, array) =>
          index > 3 && index < array.length - 3 ? "X" : char
        )
        .join("");
    }
  });
}

// Fetch a single campaign by ID
const show = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Campaign ID format" });
    }

    const campaign = await db.Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    hideTransactionID(campaign.donors);
    res.status(200).json(campaign);
  } catch (err) {
    console.error("Error fetching campaign:", err);
    res.status(500).json({ message: "Error fetching campaign" });
  }
};

// Fetch all campaigns sorted by start date
const showAll = async (req, res) => {
  try {
    const allCampaigns = await db.Campaign.find({}).sort({ start: -1 });
    if (!allCampaigns || allCampaigns.length === 0) {
      return res.status(404).json({ message: "No campaigns found" });
    }

    allCampaigns.forEach((campaign) => hideTransactionID(campaign.donors));
    res.status(200).json(allCampaigns);
  } catch (err) {
    console.error("Error fetching all campaigns:", err);
    res.status(500).json({ message: "Error fetching campaigns" });
  }
};

module.exports = {
  show,
  showAll,
};
