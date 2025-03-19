const corsOption = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with", "Accept"],
  credentials: true,
};

export default corsOption;
