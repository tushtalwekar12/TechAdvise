import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String
});

const aboutPageContentSchema = new mongoose.Schema({
  mission: String,
  values: String,
  team: [teamMemberSchema],
  contact: {
    email: String,
    phone: String
  }
});

export default mongoose.model('AboutPageContent', aboutPageContentSchema); 