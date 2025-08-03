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
        { NameENG: name },
        { Name: name }
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

    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ message: "Person not found." });
    }
  } catch (error) {
    console.error('Error retrieving person:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}