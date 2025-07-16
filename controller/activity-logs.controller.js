const ActivitiesModel = require("../models/activity-logs.model");

// 1. Add activity log

const AddActivityLog = async (type, userDetails, currentData, previousData) => {
    try {
        let info = {
            type: type,
            userDetails: userDetails,
            currentData: currentData,
            previousData: previousData
        };

        console.log(info, "addStudentData");
        // console.log(req, "req-student");

        const activityData = await ActivitiesModel.create(info);

        console.log(activityData);
    } catch (error) {
        console.error("Error posting student:", error);
    }
};

// Get all activity logs
const GetActivityLog = async (req, res) => {
    try {
        // ✅ Extract query params for pagination and filter
        const { page = 1, limit = 10, type } = req.query;

        const offset = (page - 1) * limit;

        // ✅ Build where condition dynamically for type filter
        const whereCondition = {};
        if (type) {
            whereCondition.type = type;
        }

        // ✅ Fetch paginated and filtered data
        const { rows, count } = await ActivitiesModel.findAndCountAll({
            where: whereCondition,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            records: rows,
            totalRecords: count,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
        });
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { AddActivityLog, GetActivityLog };