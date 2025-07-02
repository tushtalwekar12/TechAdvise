exports.getAbout = (req, res) => {
  res.json({
    title: "About Us",
    content: "We are a modern digital agency empowering learners and creators.",
  });
};
