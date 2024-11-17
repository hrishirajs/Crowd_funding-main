const db = require("../models");

// The below code is only for development stage
// To add some default items in our DB (Campaign collection) and check the api
const item1 = new db.Campaign({
  title: "Support Cancer Research",
  description:
"Join us in the fight against cancer. Your donations will help fund vital research to find a cure and support patients with the care they need during their treatment journey. Together, we can make a difference in the lives of those battling cancer",
    imageUrl:
    "https://www.shutterstock.com/image-photo/secure-high-level-laboratory-scientists-coverall-684989614.jpg",
  required: 500000,
  start: "2024-11-17T15:47:10.475+00:00",
});

const item2 = new db.Campaign({
  title: "Build Schools for Children",
  description:
"Help provide education to children in underprivileged areas. Your donations will go towards building new schools, providing supplies, and supporting teachers. Education is a powerful tool to break the cycle of poverty, and you can be a part of that change.",
  imageUrl:
    "hhttps://www.shutterstock.com/image-photo/katni-india-january-1-202.0-indian-1605120940.jpg",
  required: 2500000,
  start: "2024-11-17T15:47:10.475+00:00",
});

const item3 = new db.Campaign({
  title: "Provide Clean Water to Communities",
  description:
    "Access to clean water is a basic human right. Help us bring clean drinking water to communities around the world that suffer from water scarcity. Your donation will build wells and provide filtration systems, ensuring families have access to safe water.",
  imageUrl:
    "https://www.shutterstock.com/image-photo/clean-water-storage-place-mossy-bottoms-2401894695jpg",
  required: 20000,
  start: "2024-11-17T15:47:10.475+00:00",
});

const item4 = new db.Campaign({
  title: "Feed the Homeless",
  description:
    "Every night, thousands of people go to bed hungry. Your donation will provide meals for homeless individuals, ensuring they have a warm meal and a sense of dignity. Together, we can help end hunger and support those in need in our communities.",
  imageUrl:
    "https://www.shutterstock.com/image-photo/homeless-people-helped-food-relief-famine-1432140299.jpg",
  required: 50000,
  start: "2024-11-17T15:47:10.475+00:00",
});

const defaultItems = [item1, item2, item3, item4];

db.Campaign.find().exec(function (err, results) {
  var count = results.length;

  if (count == 0) {
    db.Campaign.insertMany(defaultItems, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "Successfully added default items to Campaign collection in DB"
        );
      }
    });
  }
});
// Till here ----------------------------------------------------------------------------------

function hideTransactionID(donors) {
  if (!donors || !Array.isArray(donors)) {
    console.log("No donors or donors is not an array.");
    return;
  }

  let text = "";
  for (let i = 0; i < donors.length; i++) {
    let S = donors[i].transactionID;
    text = "";
    for (let j = 0; j < S.length; j++) {
      if (j > 3 && j < S.length - 3) text = text + "X";
      else text = text + S[j];
    }

    donors[i].transactionID = text;
  }
}

const show = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      let showCampaign = await db.Campaign.findById(req.params.id);

      if (showCampaign) {
        // Ensure 'donors' exists and is an array
        hideTransactionID(showCampaign.donors);

        res.status(200).json(showCampaign);
      } else {
        res.status(404).json({
          message: "Campaign not found",
        });
      }
    } else {
      res.status(404).json({
        message: "Invalid Campaign ID format",
      });
    }
  } catch (err) {
    console.log("Error while fetching campaign:", err);
    return res.status(500).json({
      message: "Something went wrong when getting the campaign",
    });
  }
};

const showAll = async (req, res) => {
  try {
    // Add this code in CreateCampaign Route during production
    // To sort campaign in descending order of dates
    await db.Campaign.find({})
      .sort({ start: -1 })
      .exec(function (err, allCampaign) {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Database query failed" });
        } else {
          var len = allCampaign.length;

          var i;
          for (i = 0; i < len; i++) {
            let currCampaign = allCampaign[i];
            // Ensure 'donors' exists and is an array
            hideTransactionID(currCampaign.donors);
          }

          res.status(200).json(allCampaign);
        }
      });
  } catch (err) {
    console.log("Server error.", err);
    return res.status(500).json({
      message: "Something went wrong when trying to get all campaigns",
    });
  }
};

module.exports = {
  show,
  showAll,
};
