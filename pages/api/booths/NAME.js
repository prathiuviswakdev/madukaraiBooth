import dbConnect from '../../../lib/mongodb';
import VoterListmadukarai from '../../../models/VoterListmadukarai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const name = String(req.query.name);
    const booth = req.query.booth;

    let query = {
      $or: [
        { NameENG: { $regex: name, $options: 'i' } },
        { Name: { $regex: name, $options: 'i' } }
      ]
    };

    if (booth && booth !== 'all') {
      query = {
        $and: [
          query,
          { Booth: parseInt(booth) }
        ]
      };
    }

    const person = await VoterListmadukarai.find(query);

    // Always return 200 with results, even if empty
    res.status(200).json(person);
  } catch (error) {
    console.error('Error retrieving person:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}