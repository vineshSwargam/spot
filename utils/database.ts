import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'spot',
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('MongoDB connected');
  } catch (e) {
    console.log('Error while connecting to MongoDB', e);
  }
};
