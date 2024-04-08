1.Find all the topics and tasks which are thought in the month of January

db.tasks.find({ topic_date: { $lte: new Date("2024-01-31"), $gte: new Date("2024-01-01") } });
[
  {
    _id: ObjectId('6613d44702e1f76cda476e68'),
    topic_id: 1,
    topic: 'HTML',
    topic_date: ISODate('2024-01-07T00:00:00.000Z'),
    submitted: false
  },
  {
    _id: ObjectId('6613d44702e1f76cda476e69'),
    topic_id: 2,
    topic: 'CSS',
    topic_date: ISODate('2024-01-11T00:00:00.000Z'),
    submitted: true
  },
  {
    _id: ObjectId('6613d44702e1f76cda476e6a'),
    topic_id: 3,
    topic: 'Javascript',
    topic_date: ISODate('2024-01-26T00:00:00.000Z'),
    submitted: false
  }
]

db.topics.find({ topic_created: { $lte: new Date("2024-01-31"), $gte: new Date("2024-01-01") } });
[
  {
    _id: ObjectId('6613d3da02e1f76cda476e64'),
    topic_id: 1,
    topic: 'React',
    topic_created: ISODate('2024-01-15T00:00:00.000Z')
  },
  {
    _id: ObjectId('6613d3da02e1f76cda476e65'),
    topic_id: 2,
    topic: 'MongoDB',
    topic_created: ISODate('2024-01-25T00:00:00.000Z')
  }
]
----------------------------------------------------------------------------------------------------------------------
  2.Find all the company drives which appeared between 15 Jan-2024 and 31-Jan-2024

db.companydrives.find({ drive_date: { $lte: new Date("2024-01-31"), $gte: new Date("2024-01-15") } });

-----------------------------------------------------------------------------------------------------------------------

  3.Find all the company drives and students who are appeared for the placement.

  db.companydrives.aggregate({ $lookup: {
       from: "users",
        localField: "user_id",
        foreignField: "user_id",
        as: "company_drives",
        pipeline: [{ $project: { name: 1 } }],
    },
});

-------------------------------------------------------------------------------------------------------------------------

  4.Find the number of problems solved by the user in codekata

db.users.aggregate({
    $lookup: {
        from: "codekata",
        localField: "user_id",
        foreignField: "user_id",
        as: "Solved",
        pipeline: [{ $project: { codekata_problems: 1 } }],
    },
});

[
  {
    _id: ObjectId('6613ce1902e1f76cda476e58'),
    user_id: 1,
    name: 'Assay',
    email: 'assay@gmail.com',
    Solved: [
      {
        _id: ObjectId('6613ce6402e1f76cda476e5c'),
        codekata_problems: 40
      }
    ]
  },
  {
    _id: ObjectId('6613ce1902e1f76cda476e59'),
    user_id: 2,
    name: 'Sooraj',
    email: 'sooraj@gmail.com',
    Solved: [
      {
        _id: ObjectId('6613ce6402e1f76cda476e5d'),
        codekata_problems: 17
      }
    ]
  },
  {
    _id: ObjectId('6613ce1902e1f76cda476e5a'),
    user_id: 3,
    name: 'Babu',
    email: 'babu@gmail.com',
    Solved: [
      {
        _id: ObjectId('6613ce6402e1f76cda476e5e'),
        codekata_problems: 25
      }
    ]
  },
  {
    _id: ObjectId('6613ce1902e1f76cda476e5b'),
    user_id: 4,
    name: 'Sajitha',
    email: 'sajitha@gmail.com',
    Solved: [
      {
        _id: ObjectId('6613ce6402e1f76cda476e5f'),
        codekata_problems: 38
      }
    ]
  }
]
------------------------------------------------------------------------------------------------------------------------------
  5.Find all the mentors with who has the mentee's count more than 15
db.mentors.find({ class_count: { $gt: 15 } });

[
  {
    _id: ObjectId('6613d45602e1f76cda476e6c'),
    mentor_id: 1,
    mentor_name: 'Mohan',
    mentor_email: 'mohan@gmail.com',
    class_count: 20
  },
  {
    _id: ObjectId('6613d45602e1f76cda476e6e'),
    mentor_id: 3,
    mentor_name: 'Ragavkumar',
    mentor_email: 'ragav@gmail.com',
    class_count: 50
  },
  {
    _id: ObjectId('6613d45602e1f76cda476e6f'),
    mentor_id: 4,
    mentor_name: 'Rajavasanth',
    mentor_email: 'rajavasanth@gmail.com',
    class_count: 50
  }
]
-------------------------------------------------------------------------------------------------------------------------------

  6.Find the number of users who are absent and task is not submitted  between 15 jan-2024 and 31-jan-2024

db.tasks.aggregate([
        {
            $lookup: {
                from: "attendance",
                localField: "topic_id",
                foreignField: "user_id",
                as: "attendance",
            },
        },
        {
            $match: { $and: [{ submitted: false }, { "attendance.present": false }, { "attendance.date": { $lte: new Date("2024-01-31"), $gte: new Date("2024-01-15") } }] },
        },
    ]);


[
  {
    _id: ObjectId('6613d44702e1f76cda476e6a'),
    topic_id: 3,
    topic: 'Javascript',
    topic_date: ISODate('2024-01-26T00:00:00.000Z'),
    submitted: false,
    attendance: [
      {
        _id: ObjectId('6613d35f02e1f76cda476e62'),
        user_id: 3,
        topic_id: 3,
        present: false
      }
    ]
  }
]

