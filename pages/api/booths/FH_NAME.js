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

    console.log('Search parameters:', { name, booth }); // Debug log

    // Create query to search in both Father_HusbandENG and Father_Husband (Tamil) fields
    let query = {
      $or: [
        { Father_Husband: { $regex: name, $options: 'i' } }, // Case-insensitive search in English father/husband name
        { Father_HusbandENG: { $regex: name, $options: 'i' } }     // Case-insensitive search in Tamil father/husband name
      ]
    };

    // Add booth filter if specified
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
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}