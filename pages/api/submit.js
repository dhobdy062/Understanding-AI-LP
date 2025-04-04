import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, paymentType } = req.body;
    if (!name || !email || !paymentType) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Configure Airtable using environment variables
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Submissions';

    try {
      // Create a new record in Airtable
      await base(tableName).create([
        {
          fields: {
            Name: name,
            Email: email,
            PaymentType: paymentType,
            Timestamp: new Date().toISOString(),
          },
        },
      ]);
      res.status(200).json({ message: 'Submission successful' });
    } catch (error) {
      console.error('Airtable error: ', error);
      res.status(500).json({ error: 'Error saving data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}