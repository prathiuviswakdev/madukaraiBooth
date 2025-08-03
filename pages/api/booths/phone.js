import dbConnect from '../../../lib/mongodb';
import VoterList from '../../../models/voterList';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const phone = String(req.query.phone);
    const booth = req.query.booth;

    console.log('Search parameters:', { phone, booth }); // Debug log

    // Create query to search in both Phone and Govt_Phone fields
    let query = {
      $or: [
        { Phone: { $regex: phone, $options: 'i' } },      // Search in Phone field
        { Govt_Phone: { $regex: phone, $options: 'i' } }  // Search in Govt_Phone field
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

    console.log('MongoDB query:', JSON.stringify(query, null, 2)); // Debug log

    const results = await VoterList.find(query);
    
    console.log('Query result count:', results.length); // Debug log

    // Always return 200 with results, even if empty
    res.status(200).json(results);

  } catch (error) {
    console.error('Error retrieving voters by phone:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}