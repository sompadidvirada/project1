const prisma = require("../config/prisma");

exports.createCalendar = async (req, res) => {
  try {
    const { suplyer, polink, discription, userId, date } = req.body;

    if (!suplyer || !polink || !userId || !date) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newCalendarEntry = await prisma.calendar.create({
      data: {
        suplyer : suplyer,
        polink : polink,
        discription : discription,
        userId: parseInt(userId), // Make sure this is an integer
        date: new Date(date), // Convert to JS Date object
      },
    });

    return res.status(201).json(newCalendarEntry);
  } catch (err) {
    console.error("Create calendar error:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

exports.getCalendar = async (req,res) => {
    const userId = req.params.id
    try{
         const calendar = await prisma.calendar.findMany({
            where:{
                userId: Number(userId)
            }
         })
         res.send(calendar)
        return
    }catch(err){
        console.log(err)
        return res.status(500).json({message: `server error.`})
    }
}
