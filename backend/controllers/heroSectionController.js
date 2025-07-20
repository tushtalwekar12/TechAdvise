import HeroSection from '../models/HeroSection.js';

// Get the hero section (public)
export const getHeroSection = async (req, res) => {
  try {
    let hero = await HeroSection.findOne();
    if (!hero) {
      hero = await HeroSection.create({ title: 'Welcome to TechAdvise' });
    }
    res.status(200).json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update the hero section (admin)
export const updateHeroSection = async (req, res) => {
  try {
    let hero = await HeroSection.findOne();
    if (!hero) {
      hero = await HeroSection.create(req.body);
    } else {
      Object.assign(hero, req.body);
      await hero.save();
    }
    res.status(200).json({ success: true, message: 'Hero section updated', data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 