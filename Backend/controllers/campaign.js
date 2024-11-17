const db = require("../models");

// The below code is only for development stage
// To add some default items in our DB (Campaign collection) and check the api
const item1 = new db.Campaign({
  title: "test1",
  description:
    "test1dloren jhbvsd  bjbdsv chjb cdbhb bsdcb nb hg asnb hj  asbhbsjhbjhhjaxvhgbcas  hg.sahgvbcshgnbsa ghcsab hjasbjhabs  asbjh sx hahs bscjh",
  imageUrl:
    "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
  required: 500,
  start: "2020-12-22T11:18:54.919Z",
});

const item2 = new db.Campaign({
  title: "test2",
  description:
    "test2dloren jhbvsd  bjbdsv chjb cdbhb bsdcb nb hg asnb hj  asbhbsjhbjhhjaxvhgbcas  hg.sahgvbcshgnbsa ghcsab hjasbjhabs  asbjh sx hahs bscjh",
  imageUrl:
    "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
  required: 100,
  start: "2020-12-20T11:18:54.919Z",
});

const item3 = new db.Campaign({
  title: "test3",
  description:
    "test3dloren jhbvsd  bjbdsv chjb cdbhb bsdcb nb hg asnb hj  asbhbsjhbjhhjaxvhgbcas  hg.sahgvbcshgnbsa ghcsab hjasbjhabs  asbjh sx hahs bscjh",
  imageUrl:
    "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
  required: 5000,
  start: "2020-12-19T11:18:54.919Z",
});

const item4 = new db.Campaign({
  title: "test4",
  description:
    "test4dloren jhbvsd  bjbdsv chjb cdbhb bsdcb nb hg asnb hj  asbhbsjhbjhhjaxvhgbcas  hg.sahgvbcshgnbsa ghcsab hjasbjhabs  asbjh sx hahs bscjh",
  imageUrl:
    "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
  required: 50000,
  start: "2020-12-22T11:19:54.919Z",
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
