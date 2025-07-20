import mongoose from 'mongoose';

const serviceCardSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String // icon name or URL
});

const benefitSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String // icon name or URL
});

const processStepSchema = new mongoose.Schema({
  title: String,
  description: String
});

const heroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: String
});

const ctaSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  buttons: [
    {
      label: String,
      link: String
    }
  ]
});

const servicePageContentSchema = new mongoose.Schema({
  hero: heroSchema,
  services: [serviceCardSchema],
  benefits: [benefitSchema],
  processSteps: [processStepSchema],
  cta: ctaSchema
});

export default mongoose.model('ServicePageContent', servicePageContentSchema); 